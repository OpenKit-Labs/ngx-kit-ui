import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'kit-gesture-detector',
  templateUrl: './gesture-detector.component.html',
  styleUrls: ['./gesture-detector.component.scss']
})
export class KitGestureDetectorComponent {
  @Output() onTap = new EventEmitter<void>();
  @Output() onDoubleTap = new EventEmitter<void>();
  @Output() onSwipeLeft = new EventEmitter<void>();
  @Output() onSwipeRight = new EventEmitter<void>();
  @Output() onSwipeUp = new EventEmitter<void>();
  @Output() onSwipeDown = new EventEmitter<void>();
  @Output() onLongPress = new EventEmitter<void>();
  @Output() onPinch = new EventEmitter<number>();

  private touchStartTime = 0;
  private touchStartX = 0;
  private touchStartY = 0;
  private touchEndTime = 0;
  private touchEndX = 0;
  private touchEndY = 0;

  private lastTapTime = 0;
  private longPressTimeout: any;

  private initialPinchDistance = 0;

  onTouchStart(event: TouchEvent) {
    this.touchStartTime = new Date().getTime();
    this.touchStartX = event.touches[0].clientX;
    this.touchStartY = event.touches[0].clientY;

    if (event.touches.length === 2) {
      this.initialPinchDistance = this.getPinchDistance(event);
    }

    this.longPressTimeout = setTimeout(() => {
      this.onLongPress.emit();
    }, 500);
  }

  onTouchEnd(event: TouchEvent) {
    clearTimeout(this.longPressTimeout);

    this.touchEndTime = new Date().getTime();
    this.touchEndX = event.changedTouches[0].clientX;
    this.touchEndY = event.changedTouches[0].clientY;

    const tapDuration = this.touchEndTime - this.touchStartTime;
    if (tapDuration < 200) {
      const now = new Date().getTime();
      if (now - this.lastTapTime < 300) {
        this.onDoubleTap.emit();
      } else {
        this.onTap.emit();
      }
      this.lastTapTime = now;
    }

    this.handleSwipe();
  }

  onTouchMove(event: TouchEvent) {
    if (event.touches.length === 2) {
      const currentPinchDistance = this.getPinchDistance(event);
      const pinchScale = currentPinchDistance / this.initialPinchDistance;
      this.onPinch.emit(pinchScale);
    }
  }

  onMouseDown(event: MouseEvent) {
    this.touchStartTime = new Date().getTime();
    this.touchStartX = event.clientX;
    this.touchStartY = event.clientY;

    this.longPressTimeout = setTimeout(() => {
      this.onLongPress.emit();
    }, 500);
  }

  onMouseUp(event: MouseEvent) {
    clearTimeout(this.longPressTimeout);

    this.touchEndTime = new Date().getTime();
    this.touchEndX = event.clientX;
    this.touchEndY = event.clientY;

    const tapDuration = this.touchEndTime - this.touchStartTime;
    if (tapDuration < 200) {
      const now = new Date().getTime();
      if (now - this.lastTapTime < 300) {
        this.onDoubleTap.emit();
      } else {
        this.onTap.emit();
      }
      this.lastTapTime = now;
    }

    this.handleSwipe();
  }

  onMouseMove(event: MouseEvent) {
    // This is needed to track mouse movement for swipe
  }

  onWheel(event: WheelEvent) {
    if (event.ctrlKey) {
      event.preventDefault();
      const scale = event.deltaY > 0 ? 0.9 : 1.1;
      this.onPinch.emit(scale);
    }
  }

  private handleSwipe() {
    const deltaX = this.touchEndX - this.touchStartX;
    const deltaY = this.touchEndY - this.touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 50) {
        this.onSwipeRight.emit();
      } else if (deltaX < -50) {
        this.onSwipeLeft.emit();
      }
    } else {
      if (deltaY > 50) {
        this.onSwipeDown.emit();
      } else if (deltaY < -50) {
        this.onSwipeUp.emit();
      }
    }
  }

  private getPinchDistance(event: TouchEvent): number {
    const touch1 = event.touches[0];
    const touch2 = event.touches[1];
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) +
      Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  }
}