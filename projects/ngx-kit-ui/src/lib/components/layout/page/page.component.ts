import { Component, OnDestroy, Input, AfterViewInit, ElementRef, Renderer2, ContentChild, AfterContentInit, Output, EventEmitter, effect } from '@angular/core';
import { KitScreenService, ScreenSize } from '../../../services/screen/screen.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'kit-page',
  standalone: true,
  imports: [],
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class KitPageComponent implements AfterViewInit, AfterContentInit, OnDestroy {

  @Input() pullDownThreshold: number = 0;

  /**
   * When true, prevents scrolling and makes the page fill the viewport height.
   * Useful for full-screen layouts like login pages where content should not scroll.
   */
  @Input() noScroll: boolean = false;

  /**
   * Content projection for custom pull-to-refresh template
   */
  @ContentChild('[slot=pull-to-refresh]', { read: ElementRef }) pullToRefreshTemplate?: ElementRef;

  /**
   * Whether a custom pull-to-refresh template is provided
   */
  public hasCustomPullToRefreshTemplate: boolean = false;

  /**
   * Emitted when pull-to-refresh percentage changes (0-100)
   */
  @Output() pullPercentageChange = new EventEmitter<number>();

  /**
   * Emitted when pull-to-refresh is triggered (when threshold is reached)
   */
  @Output() refreshTriggered = new EventEmitter<void>();

  pageContent!: HTMLElement;
  startY = 0;
  currentY = 0;

  /**
   * Flag to track if we're in pull-to-refresh mode
   */
  private isPullingToRefresh = false;

  /**
   * Pull to refresh percentage (0-100)
   */
  public pullPercentage: number = 0;

  /**
   * Whether the pull to refresh area is visible
   */
  public isPullToRefreshVisible: boolean = false;

  /**
   * Height of the pull to refresh area as a percentage of pull progress
   */
  public pullToRefreshHeightPercent: number = 0;

  /**
   * Current class for styling based on screen size
   */
  public pageClass: string = 'kit-page-small';

  private subscription: Subscription = new Subscription();

  constructor(private screenService: KitScreenService, private el: ElementRef, private renderer: Renderer2) {
    effect(() => {
      const size = this.screenService.currentSize(); // read the signal
      this.updatePageClass(size);
    });
  }

  ngAfterContentInit(): void {
    // Check if custom pull-to-refresh template is provided
    this.hasCustomPullToRefreshTemplate = !!this.pullToRefreshTemplate;
  }

  ngAfterViewInit(): void {
    this.pageContent = this.el.nativeElement.querySelector('.page-content');

    // Only add pull-to-refresh event listeners if threshold is greater than 0
    if (this.pullDownThreshold > 0) {
      this.renderer.listen(this.pageContent, 'touchstart', (event: TouchEvent) => this.onTouchStart(event));
      this.renderer.listen(this.pageContent, 'touchmove', (event: TouchEvent) => this.onTouchMove(event));
      this.renderer.listen(this.pageContent, 'touchend', () => this.onTouchEnd());
      this.renderer.listen(this.pageContent, 'scroll', () => this.onScroll());
    }
  }

  onTouchStart(event: TouchEvent) {
    // Always capture the starting position
    this.startY = event.touches[0].clientY;

    // Only enable pull-to-refresh if we're at the top of the page
    this.isPullingToRefresh = this.pageContent.scrollTop === 0;
  }

  onTouchMove(event: TouchEvent) {
    this.currentY = event.touches[0].clientY;

    // Only proceed if we're in pull-to-refresh mode, at the top, and pulling down
    if (this.isPullingToRefresh &&
      this.pageContent.scrollTop === 0 &&
      this.currentY - this.startY > 0) {

      event.preventDefault(); // prevent scroll while pulling

      // Calculate pull distance and cap at threshold
      const pullDistance = Math.min(this.currentY - this.startY, this.pullDownThreshold);

      // Calculate percentage (0-100) based on pull distance
      this.pullPercentage = Math.round((pullDistance / this.pullDownThreshold) * 100);

      // Emit percentage change
      this.pullPercentageChange.emit(this.pullPercentage);

      // Show pull to refresh area when pulling starts
      this.isPullToRefreshVisible = pullDistance > 0;

      // Calculate height percentage smoothly from 0 to 100 based on pull percentage
      // This creates a smooth transition without jumps
      this.pullToRefreshHeightPercent = this.pullPercentage;

      // Apply smooth drag effect - the content moves down with the pull
      this.pageContent.style.transform = `translateY(${pullDistance / 2}px)`;

    } else if (this.isPullingToRefresh && this.pageContent.scrollTop > 0) {
      // If we started pull-to-refresh but user scrolled down, exit pull-to-refresh mode
      this.isPullingToRefresh = false;
      this.resetPullToRefreshState();
    }
  }

  onTouchEnd() {
    // Only process touch end if we were in pull-to-refresh mode
    if (this.isPullingToRefresh) {
      const pullDistance = this.currentY - this.startY;

      // Trigger refresh only if pulled beyond threshold
      if (pullDistance > this.pullDownThreshold) {
        this.refreshTriggered.emit();
        // Call your refresh function here
      }

      // Animate content back to original position
      this.pageContent.style.transition = 'transform 0.3s ease';
      this.pageContent.style.transform = 'translateY(0)';
      setTimeout(() => {
        this.pageContent.style.transition = '';
      }, 300);
    }

    // Always reset state on touch end
    this.resetPullToRefreshState();
  }

  /**
   * Handle scroll events to exit pull-to-refresh mode if user scrolls
   */
  onScroll(): void {
    // If we're in pull-to-refresh mode but user has scrolled down, exit the mode
    if (this.isPullingToRefresh && this.pageContent.scrollTop > 0) {
      this.resetPullToRefreshState();
    }
  }

  /**
   * Resets all pull-to-refresh related state
   */
  private resetPullToRefreshState(): void {
    this.pullPercentage = 0;
    this.pullPercentageChange.emit(0);
    this.isPullToRefreshVisible = false;
    this.pullToRefreshHeightPercent = 0;
    this.isPullingToRefresh = false;
    this.startY = 0;
    this.currentY = 0;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Updates the CSS class based on screen size
   */
  private updatePageClass(size: ScreenSize): void {
    switch (size) {
      case 'small':
        this.pageClass = 'kit-page-small';
        break;
      case 'medium':
        this.pageClass = 'kit-page-medium';
        break;
      case 'large':
        this.pageClass = 'kit-page-large';
        break;
      default:
        this.pageClass = 'kit-page-small';
    }
  }
}
