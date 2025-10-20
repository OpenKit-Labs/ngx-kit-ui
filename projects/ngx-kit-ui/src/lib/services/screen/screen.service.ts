import { Injectable, OnDestroy, signal, computed, Signal, WritableSignal } from '@angular/core';
import { fromEvent, Subscription, debounceTime } from 'rxjs';

export type ScreenSize = 'small' | 'medium' | 'large';

export interface ScreenBreakpoints {
    small: number; // Minimum width for small screens (0px)
    medium: number; // Minimum width for medium screens (e.g., 768px)
    large: number; // Minimum width for large screens (e.g., 1200px)
}

@Injectable({
    providedIn: 'root'
})
export class KitScreenService implements OnDestroy {
    // Default breakpoints
    private breakpoints: ScreenBreakpoints = {
        small: 0,     // Always true - smallest screen size
        medium: 768,  // Medium: 768px and up
        large: 1200   // Large: 1200px and up
    };

    // Current screen size (signal-based)
    private currentSizeSignal: WritableSignal<ScreenSize> = signal<ScreenSize>(this.getCurrentSize());
    // Readonly computed signal for consumers who want a Signal
    public readonly currentSize: Signal<ScreenSize> = computed(() => this.currentSizeSignal());

    // Convenience signals for each screen size
    public readonly isSmall: Signal<boolean> = computed(() => this.currentSizeSignal() === 'small');
    public readonly isMedium: Signal<boolean> = computed(() => this.currentSizeSignal() === 'medium');
    public readonly isLarge: Signal<boolean> = computed(() => this.currentSizeSignal() === 'large');

    private resizeSubscription: Subscription;

    constructor() {
        // Initialize the current size signal with current value
        this.currentSizeSignal.set(this.getCurrentSize());

        // Listen for window resize events and update the signal (debounced)
        this.resizeSubscription = fromEvent(window, 'resize')
            .pipe(debounceTime(200))
            .subscribe(() => {
                const size = this.getCurrentSize();
                if (this.currentSizeSignal() !== size) {
                    this.currentSizeSignal.set(size);
                }
            });
    }

    ngOnDestroy(): void {
        if (this.resizeSubscription) {
            this.resizeSubscription.unsubscribe();
        }
    }

    /**
     * Set custom breakpoints
     */
    setBreakpoints(breakpoints: Partial<ScreenBreakpoints>): void {
        this.breakpoints = { ...this.breakpoints, ...breakpoints };

        // Re-evaluate screen size with new breakpoints and update signal
        const currentSize = this.getCurrentSize();
        this.currentSizeSignal.set(currentSize);
    }

    /**
     * Check if the current screen matches the given size
     */
    isScreenSize(size: ScreenSize): boolean {
        const width = window.innerWidth;

        switch (size) {
            case 'large':
                return width >= this.breakpoints.large;
            case 'medium':
                return width >= this.breakpoints.medium && width < this.breakpoints.large;
            case 'small':
            default:
                return width < this.breakpoints.medium;
        }
    }

    /**
     * Get the current screen size
     */
    getCurrentSize(): ScreenSize {
        const width = window.innerWidth;

        if (width >= this.breakpoints.large) {
            return 'large';
        } else if (width >= this.breakpoints.medium) {
            return 'medium';
        } else {
            return 'small';
        }
    }

    /**
     * Check if the screen is at least the specified size
     */
    isScreenSizeAtLeast(size: ScreenSize): boolean {
        const width = window.innerWidth;

        switch (size) {
            case 'large':
                return width >= this.breakpoints.large;
            case 'medium':
                return width >= this.breakpoints.medium;
            case 'small':
            default:
                return true; // All screens are at least small
        }
    }

}
