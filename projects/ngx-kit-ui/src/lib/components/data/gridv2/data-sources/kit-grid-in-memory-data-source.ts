import { KitGridDataSource } from '../models/kit-grid-data-source.model';
import { KitGridContainsFilter, KitGridQuery } from '../models/kit-grid-query.model.model';
import { KitGridResult } from '../models/kit-grid-result.model';

function isContainsFilter(value: any): value is KitGridContainsFilter {
    return value !== null && typeof value === 'object' && 'contains' in value;
}

function getNestedValue(obj: any, field: string): any {
    return field.split('.').reduce((o, key) => o != null ? o[key] : undefined, obj);
}

export class KitGridInMemoryDataSource<T> extends KitGridDataSource<T> {
    constructor(private data: T[]) {
        super();
    }

    init(query: KitGridQuery): Promise<KitGridResult<T>> {
        return this.process(query);
    }

    queryChange(query: KitGridQuery): Promise<KitGridResult<T>> {
        return this.process(query);
    }

    private process(query: KitGridQuery): Promise<KitGridResult<T>> {
        let result = [...this.data];

        if (query.filters) {
            for (const field of Object.keys(query.filters)) {
                const value = query.filters[field];
                if (value === undefined || value === null || value === '') continue;

                result = result.filter(item => {
                    const fieldVal = getNestedValue(item, field);
                    if (isContainsFilter(value)) {
                        return String(fieldVal ?? '').toLowerCase().includes(value.contains.toLowerCase());
                    }
                    return fieldVal === value;
                });
            }
        }

        if (query.sort && query.sort.length > 0) {
            result.sort((a, b) => {
                for (const { field, direction } of query.sort!) {
                    const aVal = getNestedValue(a, field);
                    const bVal = getNestedValue(b, field);
                    const cmp = aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
                    if (cmp !== 0) return direction === 'asc' ? cmp : -cmp;
                }
                return 0;
            });
        }

        const total = result.length;
        const start = query.page * query.pageSize;
        const paged = result.slice(start, start + query.pageSize);

        return Promise.resolve({ data: paged, total });
    }
}
