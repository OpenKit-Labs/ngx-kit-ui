import {
  Component,
  OnDestroy,
  Output,
  EventEmitter,
  Inject,
  PLATFORM_ID,
  AfterViewInit,
  Input
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

/**
 * ScrollEvent interface defines the shape of the emitted scroll data.
 */
export interface ScrollEvent {
  /**
   * Current vertical scroll position in pixels.
   */
  scrollY: number;
  /**
   * Direction of the scroll: 'up', 'down', or 'none'.
   */
  scrollDirection: 'up' | 'down' | 'none';
  /**
   * Change in scroll position since the last event.
   */
  scrollDelta: number;
  /**
   * Indicates if the user is currently scrolling.
   */
  isScrolling: boolean;
  /**
   * Percentage of the total scrollable area that has been scrolled.
   */
  scrollPercentage: number;
}

@Component({
  selector: 'kit-top-bar',
  standalone: true,
  imports: [],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class KitTopBarComponent implements AfterViewInit, OnDestroy {

  /**
   * Optional input to control debounce time between scroll stop events.
   */
  @Input() debounceTime: number = 50;

  /**
   * Emits detailed scroll information to consumers of this component.
   */
  @Output() scrollChange = new EventEmitter<ScrollEvent>();

  private scrollTargetEl?: HTMLElement; // The element we're tracking for scroll events
  private lastScrollY = 0;              // Tracks previous scroll position for delta/direction
  private scrollTimeout: any;           // Timer to detect scroll end
  private isScrolling = false;          // Flag to indicate scroll activity

  private routerSub?: Subscription;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) { }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Defer scroll target lookup slightly to ensure the page content is rendered
        setTimeout(() => {
          this.findAndAttachScrollListener();
        }, 100);
      }
    });
  }

  /**
   * Attempts to find <kit-page> and its .page-content container to attach the scroll listener.
   * Retries a few times in case the DOM isn't fully rendered yet.
   */
  private findAndAttachScrollListener(retryCount = 0): void {
    const maxRetries = 10;

    const kitPage = document.querySelector<HTMLElement>('kit-page');
    if (!kitPage) {
      if (retryCount < maxRetries) {
        // Retry after a short delay
        setTimeout(() => {
          this.findAndAttachScrollListener(retryCount + 1);
        }, 200);
        return;
      }
      console.warn('kit-top-bar: Cannot find <kit-page> element after multiple attempts.');
      return;
    }

    const pageContent = kitPage.querySelector<HTMLElement>('.page-content');
    if (!pageContent) {
      if (retryCount < maxRetries) {
        setTimeout(() => {
          this.findAndAttachScrollListener(retryCount + 1);
        }, 200);
        return;
      }
      console.warn('kit-top-bar: Cannot find .page-content within <kit-page> after multiple attempts.');
      return;
    }

    if (this.scrollTargetEl) {
      this.scrollTargetEl.removeEventListener('scroll', this.onScroll.bind(this));
      this.scrollTargetEl = undefined;
    }

    this.scrollTargetEl = pageContent;
    // Attach scroll listener with passive mode for performance
    this.scrollTargetEl.addEventListener('scroll', this.onScroll.bind(this), { passive: true });

    // Emit the initial scroll state right away
    this.emitScrollEvent();
  }

  /**
   * Called whenever the scroll container emits a scroll event.
   * Debounces to detect when scrolling stops.
   */
  private onScroll(): void {
    if (!this.scrollTargetEl) return;

    this.isScrolling = true;
    this.emitScrollEvent();

    // Clear previous debounce timer
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }

    // Set a timer to mark the end of scrolling
    this.scrollTimeout = setTimeout(() => {
      this.isScrolling = false;
      this.emitScrollEvent();
    }, this.debounceTime);
  }

  /**
   * Calculates scroll data and emits the scrollChange event.
   */
  private emitScrollEvent(): void {
    if (!isPlatformBrowser(this.platformId) || !this.scrollTargetEl) return;

    const currentScrollY = this.scrollTargetEl.scrollTop;
    const scrollDelta = currentScrollY - this.lastScrollY;
    const maxScrollY = this.scrollTargetEl.scrollHeight - this.scrollTargetEl.clientHeight;

    const scrollPercentage = maxScrollY > 0
      ? (currentScrollY / maxScrollY) * 100
      : 0;

    let scrollDirection: 'up' | 'down' | 'none' = 'none';
    if (scrollDelta > 0) {
      scrollDirection = 'down';
    } else if (scrollDelta < 0) {
      scrollDirection = 'up';
    }

    const scrollEvent: ScrollEvent = {
      scrollY: currentScrollY,
      scrollDirection,
      scrollDelta,
      isScrolling: this.isScrolling,
      scrollPercentage: Math.min(100, Math.max(0, scrollPercentage))
    };

    this.scrollChange.emit(scrollEvent);
    this.lastScrollY = currentScrollY;
  }

  ngOnDestroy(): void {
    // Clean up scroll detection timeout
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }

    // Detach scroll listener
    if (this.scrollTargetEl) {
      this.scrollTargetEl.removeEventListener('scroll', this.onScroll.bind(this));
    }

    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }
}
