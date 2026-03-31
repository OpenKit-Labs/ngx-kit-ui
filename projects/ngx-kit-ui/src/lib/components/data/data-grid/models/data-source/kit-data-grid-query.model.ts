export interface KitDataGridSortEntry {
    field: string;
    direction: 'asc' | 'desc';
}

/** Matches rows where the field value contains the given substring (case-insensitive). */
export interface KitDataGridContainsFilter {
    contains: string;
}

/**
 * Union of all supported filter types. Extend this union as new filter types are added.
 * Each member is an object whose shape identifies the filter kind.
 */
export type KitDataGridFilterValue = KitDataGridContainsFilter;

/** A single field/filter pair in the filters array. */
export interface KitDataGridFilterEntry {
    field: string;
    filter: KitDataGridFilterValue;
}

export interface KitDataGridQuery {
    page: number;
    pageSize: number;
    /** Ordered list of sort entries. First entry has highest priority. */
    sort?: KitDataGridSortEntry[];
    /** Ordered list of filter entries, one per active filter. */
    filters?: KitDataGridFilterEntry[];
}
