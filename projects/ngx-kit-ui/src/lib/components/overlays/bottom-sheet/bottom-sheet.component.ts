import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit, Renderer2, OnDestroy } from '@angular/core';

@Component({
  selector: 'kit-bottom-sheet',
  standalone: true,
  imports: [],
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss']
})
/**
 * Bottom Sheet Component
 * 
 * A material-design style bottom sheet that slides up from the bottom of the screen.
 * The height can be controlled via predefined snap points (25%, 50%, 75%, 100%).
 * Users can drag the handle to resize between these snap points.
 */
export class KitBottomSheetComponent implements AfterViewInit, OnDestroy {
  /**
   * Controls whether the bottom sheet is open or closed
   */
  @Input() isOpen: boolean = false;

  /**
   * Output event to notify parent component when bottom sheet's open state changes
   */
  @Output() isOpenChange = new EventEmitter<boolean>();

  /**
   * Controls whether clicking on the backdrop closes the bottom sheet
   * Default is true if not provided
   */
  @Input() closeOnBackdropClick: boolean = true;

  /**
   * Controls the padding of the bottom sheet content
   * Default is '16px' if not provided
   */
  @Input() padding: string = '8px';

  /**
   * Available snap points as percentages of viewport height (fixed values)
   */
  readonly snapPoints: number[] = [25, 50, 75, 100];

  /**
   * Controls the maximum height of the bottom sheet
   * Must be one of the predefined snap points: 25, 50, 75, or 100 (%)
   * Defaults to 50%
   */
  @Input() set maxHeight(value: 25 | 50 | 75 | 100 | string) {
    let snapPointIndex: number;

    if (typeof value === 'number' && this.snapPoints.includes(value)) {
      snapPointIndex = this.snapPoints.indexOf(value);
    } else if (typeof value === 'string') {
      // Handle string values like '25%', '50%', etc.
      const numericValue = parseInt(value, 10);
      if (this.snapPoints.includes(numericValue)) {
        snapPointIndex = this.snapPoints.indexOf(numericValue);
      } else {
        snapPointIndex = 1; // Default to 50%
      }
    } else {
      snapPointIndex = 1; // Default to 50%
    }

    this._maxHeightSnapIndex = snapPointIndex;
  }

  get maxHeight(): string {
    return `${this.snapPoints[this._maxHeightSnapIndex]}%`;
  }

  private _maxHeightSnapIndex: number = 1; // Default to the second snap point (50%)

  /**
   * Current snap point index
   */
  currentSnapIndex: number = 1; // Default to the second snap point (50%)

  /**
   * Get the current maximum height constraint based on the max height setting
   */
  get currentMaxHeightConstraint(): number {
    return Math.min(this.snapPoints[this._maxHeightSnapIndex], 100);
  }

  /**
   * Reference to the bottom sheet container element
   */
  @ViewChild('bottomSheetContainer') bottomSheetContainer!: ElementRef;

  // Drag state variables
  private isDragging = false;
  private startY = 0;
  private startHeight = 0;
  private currentHeight = 0;
  private windowHeight = 0;
  private animationFrameId: number | null = null;
  private dragStartTime = 0;
  private hasDraggedSignificantly = false;
  private isDragTransformActive = false;
  private dragTransformY = 0;
  private isUsingTransformMode = false;

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    // Use visual viewport API for better mobile browser support, fallback to window.innerHeight
    this.windowHeight = window.visualViewport?.height || window.innerHeight;

    // Set the initial height based on the default snap point
    this.updateHeightToSnapPoint(this.currentSnapIndex);

    // Listen for window resize events to update windowHeight
    window.addEventListener('resize', this.onWindowResize);

    // Listen for visual viewport changes (mobile browser UI changes)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', this.onViewportResize);
    }
  }

  private onViewportResize = (): void => {
    this.windowHeight = window.visualViewport?.height || window.innerHeight;
    if (this.isOpen) {
      this.updateHeightToSnapPoint(this.currentSnapIndex);
    }
  }

  private onWindowResize = (): void => {
    this.windowHeight = window.visualViewport?.height || window.innerHeight;

    // Reapply the current snap point
    if (this.isOpen) {
      this.updateHeightToSnapPoint(this.currentSnapIndex);
    }
  }

  ngOnDestroy(): void {
    // Clean up any event listeners
    document.removeEventListener('mousemove', this.onDragMove);
    document.removeEventListener('mouseup', this.onDragEnd);
    document.removeEventListener('touchmove', this.onDragMove);
    document.removeEventListener('touchend', this.onDragEnd);
    window.removeEventListener('resize', this.onWindowResize);

    // Clean up visual viewport listener
    if (window.visualViewport) {
      window.visualViewport.removeEventListener('resize', this.onViewportResize);
    }

    // Cancel any pending animation frame
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  /**
   * Handles backdrop clicks
   * If closeOnBackdropClick is true, will close the bottom sheet
   */
  onBackdropClick(): void {
    if (this.closeOnBackdropClick) {
      this.isOpenChange.emit(false);
    }
  }

  /**
   * Handles drag start for the handle
   */
  onDragStart(event: MouseEvent | TouchEvent): void {
    // Prevent default behavior
    event.preventDefault();

    this.isDragging = true;
    this.dragStartTime = Date.now();
    this.hasDraggedSignificantly = false;
    this.isDragTransformActive = true;

    // **IMMEDIATE TRANSFORM MODE**: Start with transform mode for instant response on low-end devices
    this.isUsingTransformMode = true;

    // Record the starting position
    if (event instanceof MouseEvent) {
      this.startY = event.clientY;
    } else {
      this.startY = event.touches[0].clientY;
    }

    // Record the current height of the bottom sheet
    if (this.bottomSheetContainer?.nativeElement) {
      const rect = this.bottomSheetContainer.nativeElement.getBoundingClientRect();
      this.startHeight = rect.height;
      this.currentHeight = rect.height;

      // **IMMEDIATE SETUP**: Disable transitions and setup transform mode right away
      this.renderer.setStyle(
        this.bottomSheetContainer.nativeElement,
        'transition',
        'none'
      );

      // Set container to full height for transform mode
      this.renderer.setStyle(
        this.bottomSheetContainer.nativeElement,
        'height',
        `${this.windowHeight}px`
      );

      // Set initial transform position
      const translateY = this.windowHeight - this.currentHeight;
      this.renderer.setStyle(
        this.bottomSheetContainer.nativeElement,
        'transform',
        `translate3d(0, ${translateY}px, 0)`
      );

      // Add dragging class for CSS optimizations
      this.renderer.addClass(this.bottomSheetContainer.nativeElement, 'dragging');

      // Add grabbing class immediately for instant visual feedback
      this.renderer.addClass(this.bottomSheetContainer.nativeElement.querySelector('.bottom-sheet-handle'), 'grabbing');

      // Reset drag transform
      this.dragTransformY = 0;
    }

    // Add event listeners for drag and end events
    if (event instanceof MouseEvent) {
      document.addEventListener('mousemove', this.onDragMove, { passive: false });
      document.addEventListener('mouseup', this.onDragEnd);
    } else {
      document.addEventListener('touchmove', this.onDragMove, { passive: false });
      document.addEventListener('touchend', this.onDragEnd);
    }
  }

  /**
   * Handles drag move events
   */
  private onDragMove = (event: MouseEvent | TouchEvent): void => {
    if (!this.isDragging) return;

    // **IMMEDIATE RESPONSE**: Cancel any pending animation frame for instant updates
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    // **LOW-END OPTIMIZATION**: Update immediately on first few movements, then throttle
    const timeSinceStart = Date.now() - this.dragStartTime;

    if (timeSinceStart < 100) {
      // First 100ms: Update immediately for responsive feel
      this.updateDragPosition(event);
    } else {
      // After 100ms: Use requestAnimationFrame for smooth performance
      this.animationFrameId = requestAnimationFrame(() => {
        this.updateDragPosition(event);
      });
    }
  }

  private updateDragPosition(event: MouseEvent | TouchEvent): void {
    let currentY: number;
    if (event instanceof MouseEvent) {
      currentY = event.clientY;
      event.preventDefault(); // Prevent text selection during drag
    } else {
      currentY = event.touches[0].clientY;
    }

    // Calculate the drag delta
    const deltaY = this.startY - currentY;

    // **IMMEDIATE RESPONSE**: Start transform mode right away for low-end device optimization
    if (!this.isUsingTransformMode) {
      this.switchToTransformMode();
    }

    // Mark as significantly dragged on any movement for click prevention
    if (Math.abs(deltaY) > 1) {
      this.hasDraggedSignificantly = true;
    }

    // Calculate new height based on drag movement (moving up increases height)
    const newHeight = this.startHeight + deltaY;

    // Restrict the minimum height to 20% and maximum to window height
    const minHeight = this.windowHeight * 0.2;
    const maxHeight = this.windowHeight;

    this.currentHeight = Math.max(minHeight, Math.min(newHeight, maxHeight));

    if (this.bottomSheetContainer?.nativeElement) {
      // **IMMEDIATE GPU ACCELERATION**: Always use transform for instant response
      const visibleHeight = this.currentHeight;
      const translateY = this.windowHeight - visibleHeight;

      this.renderer.setStyle(
        this.bottomSheetContainer.nativeElement,
        'transform',
        `translate3d(0, ${translateY}px, 0)`
      );
    }
  }

  private switchToTransformMode(): void {
    if (!this.bottomSheetContainer?.nativeElement || this.isUsingTransformMode) return;

    this.isUsingTransformMode = true;

    // Set container to full height
    this.renderer.setStyle(
      this.bottomSheetContainer.nativeElement,
      'height',
      `${this.windowHeight}px`
    );

    // Calculate initial transform position
    const visibleHeight = this.currentHeight;
    const translateY = this.windowHeight - visibleHeight;

    this.renderer.setStyle(
      this.bottomSheetContainer.nativeElement,
      'transform',
      `translate3d(0, ${translateY}px, 0)`
    );
  }

  /**
   * Find the index of the closest snap point to the given percentage
   */
  private findClosestSnapPointIndex(percent: number): number {
    let closestIndex = 0;
    let minDistance = Math.abs(percent - this.snapPoints[0]);

    for (let i = 1; i < this.snapPoints.length; i++) {
      const distance = Math.abs(percent - this.snapPoints[i]);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }

    return closestIndex;
  }

  /**
   * Handles drag end events
   */
  private onDragEnd = (): void => {
    if (!this.isDragging) return;

    this.isDragging = false;
    this.isDragTransformActive = false;

    // Cancel any pending animation frame
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    // Remove event listeners
    document.removeEventListener('mousemove', this.onDragMove);
    document.removeEventListener('mouseup', this.onDragEnd);
    document.removeEventListener('touchmove', this.onDragMove);
    document.removeEventListener('touchend', this.onDragEnd);

    // Remove grabbing class
    if (this.bottomSheetContainer?.nativeElement) {
      this.renderer.removeClass(
        this.bottomSheetContainer.nativeElement.querySelector('.bottom-sheet-handle'),
        'grabbing'
      );

      // Remove dragging class to restore normal CSS behavior
      this.renderer.removeClass(this.bottomSheetContainer.nativeElement, 'dragging');

      // If we were using transform mode, continue with transform-based snapping
      if (this.isUsingTransformMode) {
        // Don't reset transform here - we'll snap using transforms
        this.snapToClosestPointWithTransform();
      } else {
        // Use height-based snapping for small movements
        this.snapToClosestPoint();
      }
    }
  }

  /**
   * Snaps the bottom sheet to the closest snap point
   */
  private snapToClosestPoint(): void {
    // Calculate the current height as a percentage of window height
    const currentHeightPercent = (this.currentHeight / this.windowHeight) * 100;

    // Find the closest snap point
    this.currentSnapIndex = this.findClosestSnapPointIndex(currentHeightPercent);

    // Update the height to the snap point with animation
    this.updateHeightToSnapPoint(this.currentSnapIndex);

    // Close the bottom sheet if dragged to a very small height
    if (currentHeightPercent < 15) {
      this.isOpenChange.emit(false);
    }
  }

  /**
   * Snaps the bottom sheet to the closest snap point using transform
   */
  private snapToClosestPointWithTransform(): void {
    // Calculate the current visible height as a percentage based on current height
    const currentHeightPercent = (this.currentHeight / this.windowHeight) * 100;

    // Find the closest snap point
    this.currentSnapIndex = this.findClosestSnapPointIndex(currentHeightPercent);

    // Animate to the snap point using transform
    this.updateTransformToSnapPoint(this.currentSnapIndex);

    // Close the bottom sheet if dragged to a very small height
    if (currentHeightPercent < 15) {
      this.isOpenChange.emit(false);
    }
  }

  /**
   * Updates the transform position based on the selected snap point index
   */
  private updateTransformToSnapPoint(snapIndex: number): void {
    if (!this.bottomSheetContainer?.nativeElement) {
      return;
    }

    // Ensure the snap index is valid
    if (snapIndex >= 0 && snapIndex < this.snapPoints.length) {
      const snapPoint = this.snapPoints[snapIndex];

      // Calculate target height and transform position
      const targetHeight = (this.windowHeight * snapPoint) / 100;
      const targetTransformY = this.windowHeight - targetHeight;

      // Enable smooth transform transition
      this.renderer.setStyle(
        this.bottomSheetContainer.nativeElement,
        'transition',
        'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      );

      this.renderer.setStyle(
        this.bottomSheetContainer.nativeElement,
        'transform',
        `translate3d(0, ${targetTransformY}px, 0)`
      );

      // After animation completes, switch back to height mode for consistency
      setTimeout(() => {
        if (this.bottomSheetContainer?.nativeElement) {
          // Remove transition
          this.renderer.setStyle(
            this.bottomSheetContainer.nativeElement,
            'transition',
            'none'
          );

          // Reset transform and switch to height mode
          this.renderer.setStyle(
            this.bottomSheetContainer.nativeElement,
            'transform',
            'translate3d(0, 0, 0)'
          );

          // Set the final height
          this.renderer.setStyle(
            this.bottomSheetContainer.nativeElement,
            'height',
            `${snapPoint}%`
          );

          // Mark that we're no longer using transform mode
          this.isUsingTransformMode = false;
        }
      }, 300);
    }
  }

  /**
   * Updates the height based on the selected snap point index
   */
  private updateHeightToSnapPoint(snapIndex: number): void {
    if (!this.bottomSheetContainer?.nativeElement) {
      return;
    }

    // Ensure the snap index is valid
    if (snapIndex >= 0 && snapIndex < this.snapPoints.length) {
      const snapPoint = this.snapPoints[snapIndex];

      // Use transform-based approach for smooth animation like the initial animation
      this.renderer.setStyle(
        this.bottomSheetContainer.nativeElement,
        'height',
        `${this.windowHeight}px`
      );

      // Calculate target transform position
      const targetHeight = (this.windowHeight * snapPoint) / 100;
      const targetTransformY = this.windowHeight - targetHeight;

      this.renderer.setStyle(
        this.bottomSheetContainer.nativeElement,
        'transition',
        'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      );

      this.renderer.setStyle(
        this.bottomSheetContainer.nativeElement,
        'transform',
        `translate3d(0, ${targetTransformY}px, 0)`
      );

      // Clean up after animation completes (but keep transform mode)
      setTimeout(() => {
        if (this.bottomSheetContainer?.nativeElement) {
          this.renderer.setStyle(
            this.bottomSheetContainer.nativeElement,
            'transition',
            'none'
          );
        }
      }, 300);
    }
  }

  /**
   * Handles handle click to move to next snap point
   */
  onHandleClick(): void {
    // Disable click functionality - bottom sheet should only respond to dragging
    // Do nothing on click/tap
  }
}
