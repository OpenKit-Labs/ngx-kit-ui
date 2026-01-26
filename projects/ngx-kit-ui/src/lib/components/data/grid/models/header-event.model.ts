import { KitDataGridColumn } from '../grid-column.model';

/**
 * Strongly typed event payload emitted by header renderers.
 * @template T - The type of data in the grid row
 */
export interface KitDataGridHeaderEvent<T = any> {
    /** The column definition for this header */
    column: KitDataGridColumn<T>;

    /** Optional value payload (e.g., search/filter value, sort direction) */
    value?: any;
}
