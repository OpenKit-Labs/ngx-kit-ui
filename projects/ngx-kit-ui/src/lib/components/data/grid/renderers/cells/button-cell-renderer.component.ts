import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KitDataGridCellRenderer } from '../../directives/cells/base-cell-renderer.directive';
import { KitDataGridCellEvent } from '../../models/cell-event.model';

/**
 * Example: Button cell renderer that emits a typed cell event.
 * 
 * This renderer demonstrates how to:
 * 1. Extend KitDataGridCellRenderer with a specific data type
 * 2. Emit strongly typed cellEvent with row, column, and value
 * 3. Use full type safety in event handling
 * 
 * @template T - The type of the grid row data
 * 
 * @example
 * ```typescript
 * // Register in renderer registry
 * registry.register('button', ButtonCellRendererComponent);
 * 
 * // Use in grid columns
 * const columns: KitDataGridColumn<User>[] = [
 *   { header: 'Action', type: 'button', width: '100px' }
 * ];
 * 
 * // Parent component listens to events
 * onCellAction(event: KitDataCellEvent<User>): void {
 *   if (event.value === 'delete') {
 *     // event.row is User
 *     this.userService.delete(event.row.id);
 *   }
 * }
 * ```
 */
@Component({
    selector: 'kit-button-cell-renderer',
    standalone: true,
    imports: [CommonModule],
    template: `
        <button (click)="handleClick('edit')" 
                type="button"
                aria-label="Edit">
            Edit
        </button>
        <button (click)="handleClick('delete')" 
                type="button"
                aria-label="Delete">
            Delete
        </button>
    `,
    styles: [`
        button {
            padding: 4px 8px;
            margin: 0 2px;
            cursor: pointer;
        }
    `]
})
export class ButtonCellRendererComponent<T = any> extends KitDataGridCellRenderer<T> {
    /**
     * Handles button click and emits a strongly typed cell event.
     * 
     * The event includes:
     * - row: The complete row data (type-safe)
     * - column: The column definition
     * - value: The action identifier ('edit', 'delete', etc.)
     */
    handleClick(action: string): void {
        const event: KitDataGridCellEvent = {
            row: this.row,
            column: this.column,
            value: action,
        };
        this.cellEvent.emit(event);
    }
}
