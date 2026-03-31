import { KitDataGridColumnConfig } from './config/kit-data-grid-column-config.model';
import { KitDataGridQuery } from './data-source/kit-data-grid-query.model';

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
