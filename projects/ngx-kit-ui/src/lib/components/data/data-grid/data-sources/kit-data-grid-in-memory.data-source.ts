import { signal, Signal, isSignal, effect, inject, Injector, runInInjectionContext } from '@angular/core';
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
    private data$: Signal<T[]> | null = null;
    private dataSignal: Signal<T[]> | null = null;
    private onDataChange: (() => void) | null = null;
    private injector = inject(Injector);

    constructor() {
        super();
    }

    /**
     * Set the data source - can be either a plain array or an Angular Signal.
     * If a Signal is provided, changes to the signal will automatically trigger
     * data refresh notifications.
     * 
     * @param data - Either a plain array T[] or a Signal<T[]>
     */
    setData(data: T[] | Signal<T[]>): void {
        if (isSignal(data)) {
            // Bind to signal
            this.dataSignal = data;
            this.data$ = null;

            // Watch for signal changes and notify on data change
            // Use runInInjectionContext to ensure effect() runs in proper context
            runInInjectionContext(this.injector, () => {
                effect(() => {
                    const _ = data(); // Access signal to track dependency
                    this.onDataChange?.();
                });
            });
        } else {
            // Plain array
            this.data$ = signal(data);
            this.dataSignal = null;
        }
    }

    /**
     * Register a callback that fires when data changes (for signal-based updates).
     * Called by the grid component to refresh when signal data changes.
     */
    onDataChanged(callback: () => void): void {
        this.onDataChange = callback;
    }

    init(query: KitDataGridQuery): Promise<KitDataGridResult<T>> {
        return this.process(query);
    }

    queryChange(query: KitDataGridQuery): Promise<KitDataGridResult<T>> {
        return this.process(query);
    }

    private getCurrentData(): T[] {
        if (this.dataSignal) {
            return this.dataSignal();
        }
        if (this.data$) {
            return this.data$();
        }
        return [];
    }

    private process(query: KitDataGridQuery): Promise<KitDataGridResult<T>> {
        let result = [...this.getCurrentData()];

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

                    // Handle undefined/null values: push them to the end for ascending, start for descending
                    if (aVal == null && bVal == null) {
                        continue; // both undefined, move to next sort field
                    }
                    if (aVal == null) {
                        return direction === 'asc' ? 1 : -1;
                    }
                    if (bVal == null) {
                        return direction === 'asc' ? -1 : 1;
                    }

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
