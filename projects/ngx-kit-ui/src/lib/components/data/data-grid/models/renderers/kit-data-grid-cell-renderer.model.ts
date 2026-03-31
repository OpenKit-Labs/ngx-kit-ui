import { EventEmitter, Type } from '@angular/core';

export interface KitDataGridCellRenderer<TValue = any, TConfig = any, TRow = any> {
    value: TValue;
    /** The full row object this cell belongs to. */
    row: TRow;
    /** Zero-based position of this row within the current page. */
    rowIndex: number;
    config?: TConfig;
    /**
     * Optional EventEmitter for renderer-initiated actions.
     * Declare this as an @Output() on your renderer component and the grid will
     * subscribe and re-emit via the (cellAction) output.
     * Type the emitted payload on the EventEmitter itself for full intellisense.
     *
     * @example
     * @Output() action = new EventEmitter<{ type: 'delete'; id: number }>();
     */
    action?: EventEmitter<any>;
}

export interface KitDataGridCellRendererDescriptor {
    component: Type<KitDataGridCellRenderer>;
    config?: any;
}

export function kitCellRenderer<C>(
    component: { new(...args: any[]): KitDataGridCellRenderer<any, C> },
    config?: C
): KitDataGridCellRendererDescriptor {
    return { component: component as Type<KitDataGridCellRenderer>, config };
}
