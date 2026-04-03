import { KitDataGridColumnConfig } from './config/kit-data-grid-column-config.model';

export interface KitDataGridRowClickEvent<T = any> {
    row: T;
    rowIndex: number;
    event: MouseEvent;
}

export interface KitDataGridCellActionEvent<T = any> {
    row: T;
    rowIndex: number;
    column: KitDataGridColumnConfig<T>;
    payload: unknown;
}
