import { KitDataGridFooterConfig } from '../renderers/kit-data-grid-footer-renderer.model';
import { KitDataGridColumnConfig } from './kit-data-grid-column-config.model';
import { KitDataGridRowConfig } from './kit-data-grid-row-config.model';

/**
 * Controls how the grid sizes itself vertically.
 * - `'flex'` (default): fills remaining space in a flex/grid parent; internal scroll.
 * - `'viewport'`: measures its own top offset and sizes to `100dvh - top`. Works
 *   inside any parent including scrolling pages. The page can still have content
 *   above and below the grid.
 * - `'auto'`: grows to fit all rows; the page scrolls.
 * - `number`: fixed height in px; internal scroll.
 */
export type KitDataGridHeightConfig = 'flex' | 'viewport' | 'auto' | number;

export interface KitDataGridConfig<T = any> {
    /** Column definitions array. */
    columns: KitDataGridColumnConfig<T>[];
    rows?: KitDataGridRowConfig;
    /** Controls vertical sizing. Defaults to `'flex'`. See {@link KitDataGridHeightConfig}. */
    height?: KitDataGridHeightConfig;
    /** Footer config with `renderer` component and `isVisible` flag. Omit to hide footer entirely. */
    footer?: KitDataGridFooterConfig;
}

