import { Injectable, signal, WritableSignal } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class KitNavigationService {

    /** Internal writable signal that mirrors the browser's route history */
    private _navigationHistory: WritableSignal<string[]> = signal<string[]>([]);
    /** Public read-only signal for consumers */
    navigationHistory = this._navigationHistory.asReadonly();

    /** Internal full history array and current index to mirror browser back/forward behavior */
    private fullHistory: string[] = [];
    private currentIndex = -1;

    /** Internal writable view stack (UI-level screens). Does not affect browser history or persist reloads and navigations */
    private _viewStack: WritableSignal<string[]> = signal<string[]>([]);
    /** Public read-only view stack for consumers */
    viewStack = this._viewStack.asReadonly();

    /** Tracks the base route for returning when the view stack is cleared */
    private baseView: string = '';

    /** Flag to track if we're performing a skipLocationChange navigation */
    private isSkipLocationChange = false;

    constructor(private router: Router) {
        // We'll listen to NavigationStart to detect the trigger (popstate vs imperative)
        // and NavigationEnd to update our mirrored history accordingly.
        let lastTrigger: NavigationStart['navigationTrigger'] | null = null;

        // Initialize with the current router URL so the history starts with the landing page
        const initialUrl = this.router.url || window.location.pathname + window.location.search + window.location.hash;
        this.fullHistory = [initialUrl];
        this.baseView = initialUrl; // Track the base/home view
        this.currentIndex = 0;
        this._navigationHistory.set(this.fullHistory.slice(0, this.currentIndex + 1));

        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                lastTrigger = event.navigationTrigger;
                return;
            }

            if (event instanceof NavigationEnd) {
                const url = event.urlAfterRedirects;

                if (lastTrigger === 'popstate') {
                    // The browser back/forward button was used. Move the index to match the URL.
                    const idx = this.fullHistory.indexOf(url);
                    if (idx !== -1) {
                        this.currentIndex = idx;
                    } else {
                        // Unknown URL (maybe external), reset history to this URL
                        this.fullHistory = [url];
                        this.currentIndex = 0;
                    }
                } else {
                    // Imperative navigation: push a new entry and drop any forward entries
                    if (this.currentIndex < this.fullHistory.length - 1) {
                        this.fullHistory = this.fullHistory.slice(0, this.currentIndex + 1);
                    }

                    const last = this.fullHistory[this.fullHistory.length - 1];
                    if (last !== url) {
                        this.fullHistory.push(url);
                        this.currentIndex = this.fullHistory.length - 1;
                    }
                }

                // Mirror the visible history up to the current index
                this._navigationHistory.set(this.fullHistory.slice(0, this.currentIndex + 1));

                // Reset view stack only on real route changes (not skipLocationChange navigations)
                if (!this.isSkipLocationChange) {
                    this.baseView = url; // Update the base view to the new route
                    this.clearViewStack();
                } else {
                    this.isSkipLocationChange = false;
                }

                lastTrigger = null;
            }
        });
    }

    /**
   * Navigate to a new route.
   * Adds a new entry to the navigation history and clears the view stack.
   * @param url The route path to navigate to.
   */
    navigateTo(url: string) {
        this.router.navigateByUrl(url);
    }

    /**
  * Navigate forward in browser history.
  * Clears the view stack.
  */
    navigateForward() {
        window.history.forward();
        this.clearViewStack();
    }

    /**
  * Navigate backward in browser history.
  * Clears the view stack.
  */
    navigateBack() {
        window.history.back();
        this.clearViewStack();
    }

    /**
  * Push a new view onto the view stack.
  * This does not change the browser URL or history.
  * Uses skipLocationChange to navigate internally without affecting the address bar.
  * @param url The view path to push onto the stack.
  */
    pushView(url: string) {
        this._viewStack.update(stack => [...stack, url]);
        this.isSkipLocationChange = true;
        this.router.navigateByUrl(url, { skipLocationChange: true });
    }

    /**
   * Pop the top view from the view stack.
   * Navigates back to the previous view in the stack, if any.
   * This does not affect browser history or URL.
   */
    popView() {
        const stack = this._viewStack();
        if (stack.length === 0) return;

        const newStack = stack.slice(0, -1);
        this._viewStack.set(newStack);

        // If there are views left in the stack, navigate to the previous one
        if (newStack.length > 0) {
            const previousView = newStack[newStack.length - 1];
            this.isSkipLocationChange = true;
            this.router.navigateByUrl(previousView, { skipLocationChange: true });
        } else {
            // If stack is empty, navigate back to the base view
            this.isSkipLocationChange = true;
            this.router.navigateByUrl(this.baseView, { skipLocationChange: true });
        }
    }

    /**
   * Clears the view stack completely.
   */
    clearViewStack() {
        this._viewStack.set([]);
    }

}
