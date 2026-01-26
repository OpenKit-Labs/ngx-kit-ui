export interface KitDataGridColumn<T = any> {
    header: string;
    field?: keyof T;
    type: string;
    headerType?: string;
    width?: string | number;
    minWidth?: string | number;
    maxWidth?: string | number;
}
