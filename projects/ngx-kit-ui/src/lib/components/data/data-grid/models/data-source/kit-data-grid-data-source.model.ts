import { KitDataGridQuery } from './kit-data-grid-query.model';
import { KitDataGridResult } from './kit-data-grid-result.model';

export abstract class KitDataGridDataSource<T> {
    /** Called once when the grid is initialized. Use to set up connections or load initial data. */
    abstract init(query: KitDataGridQuery): Promise<KitDataGridResult<T>>;

    /** Called whenever the query changes (pagination, sort, filter). */
    abstract queryChange(query: KitDataGridQuery): Promise<KitDataGridResult<T>>;
}
