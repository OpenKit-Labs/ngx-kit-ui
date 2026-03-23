import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { KitDataGridV1Column } from '../../grid-column.model';
import { KitDataGridV1HeaderEvent } from '../../models/header-event.model';

/**
 * Base class for all data grid header renderers.
 * Provides strongly typed event emission for header interactions.
 * 
 * @template T - The type of data in the grid row
 * 
 * @example
 * ```typescript
 * @Component({...})
 * export class FilterHeaderRenderer extends KitDataGridV1HeaderRenderer<User> {
 *   onFilterChange(searchText: string): void {
 *     this.action.emit({
 *       column: this.column,
 *       value: searchText
 *     });
 *   }
 * }
 * ```
 */
@Directive()
export abstract class KitDataGridV1HeaderRenderer<T = any> {
    /** The header text to display */
    @Input() header!: string;

    /** The column definition for this header */
    @Input() column!: KitDataGridV1Column<T>;

    /**
     * Emitted when the header triggers an action.
     * Strongly typed with column and optional value.
     */
    @Output() action = new EventEmitter<KitDataGridV1HeaderEvent<T>>();
}
