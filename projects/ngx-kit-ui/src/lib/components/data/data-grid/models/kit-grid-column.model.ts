import { KitGridCellRendererDescriptor, KitGridHeaderRendererDescriptor } from '../renderers/kit-grid-renderer-descriptor';

export interface KitGridColumn<T = any> {
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
    /** Cell renderer descriptor. Use `kitCellRenderer()` or a builtin e.g. `KitGridBuiltinCellRenderers.TimeAgo()`. */
    cellRenderer?: KitGridCellRendererDescriptor;
    /** Header renderer descriptor. Use `kitHeaderRenderer()` or a builtin e.g. `KitGridBuiltinHeaderRenderers.Default({ sortable: false })`. */
    headerRenderer?: KitGridHeaderRendererDescriptor;
}
