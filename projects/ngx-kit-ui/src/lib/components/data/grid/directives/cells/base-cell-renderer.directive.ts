import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { KitDataGridColumn } from '../../grid-column.model';
import { KitDataGridCellEvent } from '../../models/cell-event.model';

/**
 * Base class for all data grid cell renderers.
 * Provides strongly typed event emission for cell interactions.
 * 
 * @template T - The type of data in the grid row
 * 
 * @example
 * ```typescript
 * @Component({...})
 * export class MyEditableCellRenderer extends KitDataGridCellRenderer<User> {
 *   onValueChange(newValue: string): void {
 *     this.cellEvent.emit({
 *       row: this.row,
 *       column: this.column,
 *       value: newValue
 *     });
 *   }
 * }
 * ```
 */
@Directive()
export abstract class KitDataGridCellRenderer<T = any> {
    /** The cell value to display */
    @Input() value: any;

    /** The row data for this cell */
    @Input() row!: T;

    /** The column definition for this cell */
    @Input() column!: KitDataGridColumn<T>;

    /** Optional parameters passed from the grid */
    @Input() params?: any;

    /**
     * Emitted when the cell triggers an action.
     * Strongly typed with row, column, and optional value.
     */
    @Output() cellEvent = new EventEmitter<KitDataGridCellEvent<T>>();
}
