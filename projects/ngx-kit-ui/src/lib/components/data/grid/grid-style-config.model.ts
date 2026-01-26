/**
 * Typed configuration for per-grid styling customization.
 * All properties are optional and fall back to base stylesheet defaults.
 *
 * This interface provides ergonomic, discoverable styling knobs
 * without exposing internal CSS variables directly to consumers.
 *
 * Properties are organized by scope: Grid → Header → Column → Row → Cell
 */
export interface GridStyleConfig {
  // ============================================================================
  // GRID - Container-level styling
  // ============================================================================

  /**
   * Background color for the main grid container.
   * Accepts CSS color values (hex, rgb, var(), etc.)
   * Default: white
   */
  gridBackground?: string;

  /**
   * Background image, gradient, or radial gradient for the main grid container.
   * Accepts CSS background-image values (url(), linear-gradient(), radial-gradient(), etc.)
   * Default: none
   */
  gridBackgroundImage?: string;

  /**
   * Box shadow for the grid table.
   * Default: 0 2px 8px rgba(0, 0, 0, 0.04)
   */
  gridShadow?: string;

  /**
   * Table border radius (rounded corners).
   * Default: 8px
   */
  gridBorderRadius?: string | number;

  /**
   * Border color between rows and columns.
   * Default: #eaeaea
   */
  gridBorderColor?: string;

  /**
   * Border width between cells and rows.
   * Default: 1px
   */
  gridBorderWidth?: string | number;

  // ============================================================================
  // HEADER - Header row styling
  // ============================================================================

  /**
   * Background color for the header row.
   * Default: #f7f7f9
   */
  headerBackground?: string;

  /**
   * Background image, gradient, or radial gradient for the header row.
   * Accepts CSS background-image values (url(), linear-gradient(), radial-gradient(), etc.)
   * Default: none
   */
  headerBackgroundImage?: string;

  /**
   * Vertical padding for header cells (top and bottom).
   * Default: 0.75rem
   */
  headerPaddingY?: string | number;

  /**
   * Horizontal padding for header cells (left and right).
   * Default: 1.25rem
   */
  headerPaddingX?: string | number;

  // ============================================================================
  // COLUMN - Column-level styling (can be overridden per-column in column definition)
  // ============================================================================

  /**
   * Default cell width in pixels or CSS unit string.
   * Can be overridden per-column in the column definition.
   * Accepts CSS width values (px, rem, em, %, auto, etc.)
   * Default: auto (size to content)
   */
  columnWidth?: string | number;

  /**
   * Default minimum cell width. Useful for content constraints.
   * Can be overridden per-column in the column definition.
   * Default: auto
   */
  columnMinWidth?: string | number;

  /**
   * Default maximum cell width. Useful for content constraints.
   * Can be overridden per-column in the column definition.
   * Default: auto
   */
  columnMaxWidth?: string | number;

  // ============================================================================
  // ROW - Row-level styling
  // ============================================================================

  /**
   * Row height in pixels or CSS unit string.
   * Default: 48px (from base stylesheet)
   */
  rowHeight?: string | number;

  /**
   * Minimum row height. Useful when content wraps.
   * Default: 48px
   */
  rowMinHeight?: string | number;

  /**
   * Maximum row height. Useful for content constraints.
   * Default: auto
   */
  rowMaxHeight?: string | number;

  /**
   * Background color for data rows.
   * Accepts CSS color values (hex, rgb, var(), etc.)
   * Default: white
   */
  rowBackground?: string;

  /**
   * Background image, gradient, or radial gradient for data rows.
   * Accepts CSS background-image values (url(), linear-gradient(), radial-gradient(), etc.)
   * Default: none
   */
  rowBackgroundImage?: string;

  /**
   * Background color for alternating rows (striping).
   * Set to undefined or same as rowBackground to disable.
   * Default: #f9f9fb
   */
  rowAlternateBackground?: string;

  /**
   * Background image, gradient, or radial gradient for alternating rows.
   * Accepts CSS background-image values (url(), linear-gradient(), radial-gradient(), etc.)
   * Default: none
   */
  rowAlternateBackgroundImage?: string;

  /**
   * Background color on row hover.
   * Default: #f0f4fa
   */
  rowHoverBackground?: string;

  /**
   * Background image, gradient, or radial gradient on row hover.
   * Accepts CSS background-image values (url(), linear-gradient(), radial-gradient(), etc.)
   * Default: none
   */
  rowHoverBackgroundImage?: string;

  /**
   * Background color for selected rows.
   * Default: rgba(0, 102, 204, 0.1)
   */
  rowSelectedBackground?: string;

  /**
   * Background image or gradient for selected rows.
   * Accepts CSS gradient or url() values.
   * Default: none
   */
  rowSelectedBackgroundImage?: string;

  // ============================================================================
  // CELL - Cell-level styling
  // ============================================================================

  /**
   * Vertical padding for data cells (top and bottom).
   * Default: 0.75rem
   */
  cellPaddingY?: string | number;

  /**
   * Horizontal padding for data cells (left and right).
   * Default: 1.25rem
   */
  cellPaddingX?: string | number;
}
