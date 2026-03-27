export interface KitGridSortEntry {
    field: string;
    direction: 'asc' | 'desc';
}

/**
 * Use this to pass a substring filter for a field.
 * KitGridInMemoryDataSource will apply case-insensitive includes matching.
 * Plain values are matched with strict equality.
 */
export interface KitGridContainsFilter {
    contains: string;
}

export interface KitGridQuery {
    page: number;
    pageSize: number;
    /** Ordered list of sort entries. First entry has highest priority. */
    sort?: KitGridSortEntry[];
    /** Per-column filters. Values are either a plain value (exact match) or KitGridContainsFilter. */
    filters?: Record<string, any>;
}
