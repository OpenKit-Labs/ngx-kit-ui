import { Type } from '@angular/core';
import { KitGridCellRenderer } from '../renderers/kit-grid-cell-renderer';
import { KitGridFooterRenderer } from '../renderers/kit-grid-footer-renderer';
import { KitGridHeaderRenderer } from '../renderers/kit-grid-header-renderer';

export interface KitGridColumn<T = any> {
    field: keyof T;
    title: string;
    /**
     * Absolute base width in px.
     * minWidth is applied as a floor: final = max(absoluteWidth, minWidth)
     * maxWidth is applied as a ceiling: final = min(result, maxWidth)
     * The result is a fixed px value — this column does not stretch.
     */
    absoluteWidth?: number;
    /** Minimum column width in px. Prevents shrinking below this value. Defaults to 199px. */
    minWidth?: number;
    /** Maximum column width in px. Prevents stretching beyond this value. */
    maxWidth?: number;
    cellRenderer?: Type<KitGridCellRenderer>;
    headerRenderer?: Type<KitGridHeaderRenderer>;
    footerRenderer?: Type<KitGridFooterRenderer>;
    /** Arbitrary config forwarded to the cell/header/footer renderer as `config`. */
    rendererConfig?: any;
}
