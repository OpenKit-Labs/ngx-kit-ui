import { Component, Input, HostBinding } from '@angular/core';

/**
 * Preset positions for the positioned component
 */
export type PositionPreset = 'top-left' | 'top-center' | 'top-right' |
    'center-left' | 'center' | 'center-right' |
    'bottom-left' | 'bottom-center' | 'bottom-right';

@Component({
    selector: 'kit-positioned',
    templateUrl: './positioned.component.html',
    styleUrls: ['./positioned.component.scss'],
    standalone: true
})
export class KitPositionedComponent {
    /**
     * Preset position. If provided, overrides individual top/right/bottom/left values.
     */
    @Input() position?: PositionPreset;

    /**
     * Custom top position (ignored if position preset is used)
     */
    @Input() top?: string;

    /**
     * Custom right position (ignored if position preset is used)
     */
    @Input() right?: string;

    /**
     * Custom bottom position (ignored if position preset is used)
     */
    @Input() bottom?: string;

    /**
     * Custom left position (ignored if position preset is used)
     */
    @Input() left?: string;

    @Input() width?: string;
    @Input() height?: string;

    @HostBinding('style.position') get hostPosition() { return 'absolute'; }
    @HostBinding('style.top') get styleTop() { return this.getTop(); }
    @HostBinding('style.right') get styleRight() { return this.getRight(); }
    @HostBinding('style.bottom') get styleBottom() { return this.getBottom(); }
    @HostBinding('style.left') get styleLeft() { return this.getLeft(); }
    @HostBinding('style.width') get styleWidth() { return this.width ?? null; }
    @HostBinding('style.height') get styleHeight() { return this.height ?? null; }
    @HostBinding('style.transform') get styleTransform() { return this.getTransform(); }

    private getTop(): string | null {
        if (!this.position) return this.top ?? null;

        if (this.position.startsWith('top-')) return '0';
        if (this.position.startsWith('center')) return '50%';
        return null;
    }

    private getRight(): string | null {
        if (!this.position) return this.right ?? null;

        if (this.position.endsWith('-right')) return '0';
        return null;
    }

    private getBottom(): string | null {
        if (!this.position) return this.bottom ?? null;

        if (this.position.startsWith('bottom-')) return '0';
        return null;
    }

    private getLeft(): string | null {
        if (!this.position) return this.left ?? null;

        if (this.position.endsWith('-left')) return '0';
        if (this.position.endsWith('-center') || this.position === 'center') return '50%';
        return null;
    }

    private getTransform(): string | null {
        if (!this.position) return null;

        if (this.position === 'center') {
            return 'translate(-50%, -50%)';
        } else if (this.position.endsWith('-center')) {
            return 'translateX(-50%)';
        } else if (this.position.startsWith('center-')) {
            return 'translateY(-50%)';
        }
        return null;
    }
}
