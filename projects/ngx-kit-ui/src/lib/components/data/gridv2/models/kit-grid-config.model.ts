import { KitGridFooterRendererDescriptor } from '../renderers/kit-grid-renderer-descriptor';

/**
 * Controls how the grid sizes itself vertically.
 * - `'flex'` (default): fills remaining space in a flex/grid parent; internal scroll.
 * - `'viewport'`: measures its own top offset and sizes to `100dvh - top`. Works
 *   inside any parent including scrolling pages. The page can still have content
 *   above and below the grid.
 * - `'auto'`: grows to fit all rows; the page scrolls.
 * - `number`: fixed height in px; internal scroll.
 */
export type KitGridHeight = 'flex' | 'viewport' | 'auto' | number;

export interface KitGridRowConfig {
    /** Exact row height in px. When set, minHeight and maxHeight are ignored. */
    height?: number;
    /** Minimum row height in px. Defaults to 199px when neither this nor height is set. */
    minHeight?: number;
    /** Maximum row height in px. Defaults to 199px when neither this nor height is set. */
    maxHeight?: number;
}

export interface KitGridConfig {
    row?: KitGridRowConfig;
    /** Controls vertical sizing. Defaults to `'flex'`. See {@link KitGridHeight}. */
    height?: KitGridHeight;
    /** Whether to show the footer bar. Defaults to true. */
    showFooter?: boolean;
    /** Footer renderer descriptor. Use `kitFooterRenderer()` or a builtin e.g. `KitGridBuiltinFooterRenderers.Default({ showPageInfo: true })`. */
    footer?: KitGridFooterRendererDescriptor;
}

