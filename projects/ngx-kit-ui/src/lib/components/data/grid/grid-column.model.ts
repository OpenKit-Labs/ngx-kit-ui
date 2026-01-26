export interface KitDataGridColumn<T = any> {
    header: string;
    field?: keyof T;
    type: string;
    headerType?: string;
}
