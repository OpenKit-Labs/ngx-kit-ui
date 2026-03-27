import { KitGridQuery } from '../../models/kit-grid-query.model.model';
import { KitGridResult } from '../../models/kit-grid-result.model';

export interface KitGridFooterRenderer<TConfig = any> {
    result: KitGridResult<any>;
    query: KitGridQuery;
    onQueryChange: (query: KitGridQuery) => void;
    config?: TConfig;
}
