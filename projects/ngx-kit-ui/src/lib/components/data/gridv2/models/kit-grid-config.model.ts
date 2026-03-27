import { KitGridFooterRendererDescriptor } from '../renderers/kit-grid-renderer-descriptor';

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
    /** Whether to show the footer bar. Defaults to true. */
    showFooter?: boolean;
    /** Footer renderer descriptor. Use `kitFooterRenderer()` or a builtin e.g. `KitGridBuiltinFooterRenderers.Default({ showPageInfo: true })`. */
    footer?: KitGridFooterRendererDescriptor;
}

