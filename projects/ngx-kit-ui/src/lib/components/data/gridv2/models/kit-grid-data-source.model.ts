import { KitGridQuery } from './kit-grid-query.model.model';
import { KitGridResult } from './kit-grid-result.model';

export abstract class KitGridDataSource<T> {
    /** Called once when the grid is initialized. Use to set up connections or load initial data. */
    abstract init(query: KitGridQuery): Promise<KitGridResult<T>>;

    /** Called whenever the query changes (pagination, sort, filter). */
    abstract queryChange(query: KitGridQuery): Promise<KitGridResult<T>>;
}
