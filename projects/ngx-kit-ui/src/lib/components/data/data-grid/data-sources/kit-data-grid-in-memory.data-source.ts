import { KitDataGridDataSource } from '../models/data-source/kit-data-grid-data-source.model';
import { KitDataGridContainsFilter, KitDataGridQuery } from '../models/data-source/kit-data-grid-query.model';
import { KitDataGridResult } from '../models/data-source/kit-data-grid-result.model';

function isContainsFilter(value: any): value is KitDataGridContainsFilter {
    return value !== null && typeof value === 'object' && 'contains' in value;
}

function getNestedValue(obj: any, field: string): any {
    return field.split('.').reduce((o, key) => o != null ? o[key] : undefined, obj);
}

export class KitDataGridInMemoryDataSource<T> extends KitDataGridDataSource<T> {
    constructor(private data: T[]) {
        super();
    }

    init(query: KitDataGridQuery): Promise<KitDataGridResult<T>> {
        return this.process(query);
    }

    queryChange(query: KitDataGridQuery): Promise<KitDataGridResult<T>> {
        return this.process(query);
    }

    private process(query: KitDataGridQuery): Promise<KitDataGridResult<T>> {
        let result = [...this.data];

        if (query.filters) {
            for (const { field, filter } of query.filters) {
                result = result.filter(item => {
                    const fieldVal = getNestedValue(item, field);
                    if (isContainsFilter(filter)) {
                        return String(fieldVal ?? '').toLowerCase().includes(filter.contains.toLowerCase());
                    }
                    return fieldVal === filter;
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
