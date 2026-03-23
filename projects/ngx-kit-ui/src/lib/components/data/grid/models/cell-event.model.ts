import { KitDataGridV1Column } from '../grid-column.model';

/**
 * Strongly typed event payload emitted by cell renderers.
 * @template T - The type of data in the grid row
 */
export interface KitDataGridV1CellEvent<T = any> {
    /** The row data that triggered the event */
    row: T;

    /** The column definition where the event occurred */
    column: KitDataGridV1Column<T>;

    /** Optional value payload (e.g., new value from editable cells) */
    value?: any;
}
