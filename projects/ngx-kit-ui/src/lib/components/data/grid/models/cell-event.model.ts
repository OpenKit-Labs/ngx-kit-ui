import { KitDataGridColumn } from '../grid-column.model';

/**
 * Strongly typed event payload emitted by cell renderers.
 * @template T - The type of data in the grid row
 */
export interface KitDataGridCellEvent<T = any> {
    /** The row data that triggered the event */
    row: T;

    /** The column definition where the event occurred */
    column: KitDataGridColumn<T>;

    /** Optional value payload (e.g., new value from editable cells) */
    value?: any;
}
