import { Directive, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { takeUntil, switchMap, filter } from 'rxjs/operators';

@Directive({
  selector: '[kitPressAndHold]'
})
export class KitPressAndHoldDirective implements OnInit, OnDestroy {

  // holdTime is in milliseconds
  @Input() holdTime = 500;
  @Output('holdTimeout') holdRelease = new EventEmitter<void>();

  private destroy$ = new Subject<void>();
  private mouseDown$ = new Subject<void>();
  private mouseUp$ = new Subject<void>();

  // Use pointer events to cover mouse + touch + pen input
  @HostListener('pointerdown', ['$event'])
  onPointerDown(_: PointerEvent) {
    this.mouseDown$.next();
  }

  @HostListener('pointerup')
  onPointerUp() {
    this.mouseUp$.next();
  }

  // If the pointer leaves the element or is cancelled, treat as a release/cancel
  @HostListener('pointerleave')
  onPointerLeave() {
    this.mouseUp$.next();
  }

  @HostListener('pointercancel')
  onPointerCancel() {
    this.mouseUp$.next();
  }

  // Also catch pointerup on the document in case the pointer is released outside the element
  @HostListener('document:pointerup')
  onDocumentPointerUp() {
    this.mouseUp$.next();
  }

  ngOnInit() {
    this.mouseDown$.pipe(
      takeUntil(this.destroy$),
      switchMap(() => timer(this.holdTime).pipe(takeUntil(this.mouseUp$))),
      filter(val => val === 0)
    ).subscribe(() => {
      this.holdRelease.emit();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
