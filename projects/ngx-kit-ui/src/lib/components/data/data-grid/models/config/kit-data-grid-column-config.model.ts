import { KitDataGridCellRendererDescriptor } from '../renderers/kit-data-grid-cell-renderer.model';
import { KitDataGridHeaderRendererDescriptor } from '../renderers/kit-data-grid-header-renderer';

export interface KitDataGridColumnConfig<T = any> {
    field: keyof T | string;
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
    /** Cell renderer descriptor. Use `KitDataGridRenderers.cell()` or a builtin e.g. `KitDataGridBuiltinCellRenderers.TimeAgo()`. */
    cellRenderer?: KitDataGridCellRendererDescriptor;
    /** Header renderer descriptor. Use `KitDataGridRenderers.header()` or a builtin e.g. `KitDataGridBuiltinHeaderRenderers.Control({ sortable: true })`. */
    headerRenderer?: KitDataGridHeaderRendererDescriptor;
}
