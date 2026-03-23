import { KitDataGridV1Column } from '../grid-column.model';

/**
 * Strongly typed event payload emitted by header renderers.
 * @template T - The type of data in the grid row
 */
export interface KitDataGridV1HeaderEvent<T = any> {
    /** The column definition for this header */
    column: KitDataGridV1Column<T>;

    /** Optional value payload (e.g., search/filter value, sort direction) */
    value?: any;
}
