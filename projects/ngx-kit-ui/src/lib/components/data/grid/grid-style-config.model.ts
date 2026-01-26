/**
 * Typed configuration for per-grid styling customization.
 * All properties are optional and fall back to base stylesheet defaults.
 *
 * This interface provides ergonomic, discoverable styling knobs
 * without exposing internal CSS variables directly to consumers.
 */
export interface GridStyleConfig {
  /**
   * Background color for the main grid container.
   * Accepts CSS color values (hex, rgb, var(), etc.)
   * Default: white
   */
  gridBackground?: string;

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
   * Background image or gradient for data rows.
   * Accepts CSS gradient or url() values.
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
   * Background image or gradient for alternating rows.
   * Accepts CSS gradient or url() values.
   * Default: none
   */
  rowAlternateBackgroundImage?: string;

  /**
   * Background color on row hover.
   * Default: #f0f4fa
   */
  rowHoverBackground?: string;

  /**
   * Background image or gradient on row hover.
   * Accepts CSS gradient or url() values.
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

  /**
   * Background color for the header row.
   * Default: #f7f7f9
   */
  headerBackground?: string;

  /**
   * Background image or gradient for the header row.
   * Accepts CSS gradient or url() values.
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

  /**
   * Border color between rows and columns.
   * Default: #eaeaea
   */
  borderColor?: string;

  /**
   * Border width between cells and rows.
   * Default: 1px
   */
  borderWidth?: string | number;

  /**
   * Table border radius (rounded corners).
   * Default: 8px
   */
  borderRadius?: string | number;

  /**
   * Box shadow for the grid table.
   * Default: 0 2px 8px rgba(0, 0, 0, 0.04)
   */
  shadow?: string;

  /**
   * Note: Font sizing, line-height and density presets are handled by the
   * global theme and CSS variables. Per-grid config intentionally omits
   * these properties to avoid inconsistent spacing across the app.
   */

}
