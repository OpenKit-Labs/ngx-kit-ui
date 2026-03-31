export interface KitDataGridRowConfig {
    /** Exact row height in px. When set, minHeight and maxHeight are ignored. */
    height?: number;
    /** Minimum row height in px. Defaults to 199px when neither this nor height is set. */
    minHeight?: number;
    /** Maximum row height in px. Defaults to 199px when neither this nor height is set. */
    maxHeight?: number;
}
