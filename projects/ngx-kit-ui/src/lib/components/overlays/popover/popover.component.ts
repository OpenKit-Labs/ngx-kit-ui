import { Component, Input, Output, EventEmitter, HostBinding, ViewChild, ElementRef, OnInit, AfterViewInit, OnChanges, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';

export type PopoverPosition = 'top' | 'bottom' | 'left' | 'right';

@Component({
    selector: 'kit-popover',
    standalone: true,
    imports: [NgClass, NgStyle],
    templateUrl: './popover.component.html',
    styleUrls: ['./popover.component.scss']
})
export class KitPopoverComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
    /** Controls whether the popover is open or closed */
    @Input() isOpen: boolean = false;

    /** Emitted when the popover requests a state change (e.g. Escape key) */
    @Output() isOpenChange = new EventEmitter<boolean>();

    /** The id of the element this popover is anchored to */
    @Input() ownerElement?: string;

    /** Position of the popover relative to the owner element */
    @Input() position: PopoverPosition = 'bottom';

    /** Close when Escape is pressed */
    @Input() closeOnEscape: boolean = true;

    /** Close when the page is scrolled (default: true) */
    @Input() closeOnScroll: boolean = true;

    /** Padding inside the popover content area */
    @Input() padding: string = '12px';

    @ViewChild('popoverContainer') popoverContainer?: ElementRef;

    popoverStyle: { [key: string]: string } = {};
    activePosition: PopoverPosition = 'bottom';

    @HostBinding('class.kit-popover--open')
    get isOpenClass(): boolean { return this.isOpen; }

    private escapeHandler = (e: KeyboardEvent) => this.handleEscapeKey(e);
    private scrollHandler = () => {
        if (!this.isOpen) return;
        if (this.closeOnScroll) {
            this.isOpenChange.emit(false);
        } else {
            this.updatePosition();
        }
    };

    constructor(private cdr: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.activePosition = this.position;
        document.addEventListener('keydown', this.escapeHandler);
        window.addEventListener('scroll', this.scrollHandler, true);
        window.addEventListener('resize', this.scrollHandler);
    }

    ngOnDestroy(): void {
        document.removeEventListener('keydown', this.escapeHandler);
        window.removeEventListener('scroll', this.scrollHandler, true);
        window.removeEventListener('resize', this.scrollHandler);
    }

    ngAfterViewInit(): void {
        if (this.isOpen) setTimeout(() => this.updatePosition(), 0);
    }

    ngOnChanges(): void {
        if (this.isOpen) {
            setTimeout(() => this.updatePosition(), 0);
        }
    }

    private getOwnerEl(): HTMLElement | null {
        if (!this.ownerElement) return null;
        return document.getElementById(this.ownerElement);
    }

    private updatePosition(): void {
        const ownerEl = this.getOwnerEl();
        if (!ownerEl || !this.popoverContainer) return;

        const rect = ownerEl.getBoundingClientRect();
        const popover = this.popoverContainer.nativeElement;
        const pw = popover.offsetWidth;
        const ph = popover.offsetHeight;
        const offset = 12; // accounts for 9px arrow + 3px visual gap
        const margin = 8; // min distance from viewport edge
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        // Compute the ideal position for each side
        const positions: Record<PopoverPosition, { top: number; left: number }> = {
            top: { top: rect.top - ph - offset, left: rect.left + (rect.width - pw) / 2 },
            bottom: { top: rect.bottom + offset, left: rect.left + (rect.width - pw) / 2 },
            left: { top: rect.top + (rect.height - ph) / 2, left: rect.left - pw - offset },
            right: { top: rect.top + (rect.height - ph) / 2, left: rect.right + offset },
        };

        // Determine if a position fits inside the viewport
        const fits = (pos: PopoverPosition): boolean => {
            const { top, left } = positions[pos];
            return top >= margin && left >= margin && top + ph <= vh - margin && left + pw <= vw - margin;
        };

        // Try preferred position, then try opposite, then try the remaining two
        const fallbacks: Record<PopoverPosition, PopoverPosition[]> = {
            top: ['top', 'bottom', 'left', 'right'],
            bottom: ['bottom', 'top', 'left', 'right'],
            left: ['left', 'right', 'bottom', 'top'],
            right: ['right', 'left', 'bottom', 'top'],
        };

        let chosenPos = this.position;
        for (const candidate of fallbacks[this.position]) {
            if (fits(candidate)) { chosenPos = candidate; break; }
        }

        let { top, left } = positions[chosenPos];

        // Final clamp — never let the popover escape the viewport even if no position "fits"
        top = Math.max(margin, Math.min(top, vh - ph - margin));
        left = Math.max(margin, Math.min(left, vw - pw - margin));

        // Update the CSS class so the arrow points the right direction
        this.activePosition = chosenPos;

        this.popoverStyle = { 'top': `${top}px`, 'left': `${left}px` };
        this.cdr.markForCheck();
    }

    private handleEscapeKey(event: KeyboardEvent): void {
        if (event.key === 'Escape' && this.isOpen && this.closeOnEscape) {
            this.isOpenChange.emit(false);
        }
    }

    get popoverClasses(): string[] {
        return ['kit-popover__container', `kit-popover--${this.activePosition}`];
    }
}
