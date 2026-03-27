import { KitGridQuery } from '../../models/kit-grid-query.model.model';

export interface KitGridHeaderRenderer<TConfig = any> {
    title: string;
    field: string;
    query: KitGridQuery;
    onQueryChange: (query: KitGridQuery) => void;
    config?: TConfig;
}
