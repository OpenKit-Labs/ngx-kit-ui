import { Component, HostListener } from '@angular/core';

@Component({
    selector: 'kit-app-root',
    standalone: true,
    imports: [],
    templateUrl: './app-root.component.html',
    styleUrls: ['./app-root.component.scss']
})
export class KitAppRootComponent {

    constructor() { }

    private recentlyFocused = false;
    private lastTouchMove = 0;

    @HostListener('window:focusin', ['$event'])
    onFocusIn(event: FocusEvent) {
        const target = event.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
            this.recentlyFocused = true;
            setTimeout(() => this.recentlyFocused = false, 500);
        }
    }

    @HostListener('window:touchmove', [])
    onTouchMove() {
        const now = Date.now();

        // throttle to run at most once every 1000ms
        if (now - this.lastTouchMove < 1000) {
            return;
        }

        this.lastTouchMove = now;

        if (this.recentlyFocused) {
            return;
        }

        const activeElement = document.activeElement as HTMLElement;
        if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
            activeElement.blur();
        }
    }

}
