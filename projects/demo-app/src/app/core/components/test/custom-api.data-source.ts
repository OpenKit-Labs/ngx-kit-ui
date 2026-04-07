import { KitDataGridTypes, KitDataGridDataSources } from '../../../../../../ngx-kit-ui/src/public-api';

interface User {
    id: number;
    name: string;
    email: string;
    joined: Date;
    location: {
        city: string | undefined;
        code: string | undefined;
    };
}

/**
 * Custom API Data Source
 * 
 * Simulates a real API that:
 * - Returns a filtered/sorted subset based on the query
 * - Applies client-side filtering and sorting
 * - Has pagination
 * - Simulates network latency
 */
export class CustomApiDataSource extends KitDataGridTypes.KitDataGridDataSource<User> {
    // Simulated "database" - in real app, this would come from API
    private allUsers: User[] = [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', joined: new Date('2023-01-15'), location: { city: 'New York', code: 'NY' } },
        { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', joined: new Date('2023-02-20'), location: { city: 'Los Angeles', code: 'CA' } },
        { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', joined: new Date('2023-03-10'), location: { city: 'Chicago', code: 'IL' } },
        { id: 4, name: 'Alice Williams', email: 'alice.williams@example.com', joined: new Date('2023-04-05'), location: { city: 'San Francisco', code: 'CA' } },
        { id: 5, name: 'Charlie Brown', email: 'charlie.brown@example.com', joined: new Date('2023-05-12'), location: { city: 'Boston', code: 'MA' } },
        { id: 6, name: 'Diana Prince', email: 'diana.prince@example.com', joined: new Date('2023-06-08'), location: { city: undefined, code: undefined } },
        { id: 7, name: 'Eve Davis', email: 'eve.davis@example.com', joined: new Date('2023-07-22'), location: { city: 'Seattle', code: 'WA' } },
    ];

    constructor() {
        super();
    }

    async init(query: KitDataGridTypes.KitDataGridQuery): Promise<KitDataGridTypes.KitDataGridResult<User>> {
        console.log('[CustomApiDataSource] init called with query:', query);
        return this.simulateApiCall(query);
    }

    async queryChange(query: KitDataGridTypes.KitDataGridQuery): Promise<KitDataGridTypes.KitDataGridResult<User>> {
        console.log('[CustomApiDataSource] queryChange called with query:', query);
        console.log('  - Page:', query.page);
        console.log('  - Page Size:', query.pageSize);
        console.log('  - Sort:', query.sort);
        console.log('  - Filters:', query.filters);
        return this.simulateApiCall(query);
    }

    /**
     * Simulates an API call that:
     * 1. Filters the data
     * 2. Sorts the data
     * 3. Paginates the result
     * 4. Has artificial delay to simulate network latency
     */
    private async simulateApiCall(query: KitDataGridTypes.KitDataGridQuery): Promise<KitDataGridTypes.KitDataGridResult<User>> {
        // Simulate network latency (500ms)
        await new Promise(resolve => setTimeout(resolve, 500));

        let result = [...this.allUsers];

        // Apply filters
        if (query.filters && query.filters.length > 0) {
            for (const { field, filter } of query.filters) {
                result = result.filter(user => {
                    const fieldVal = this.getFieldValue(user, field);
                    if ('contains' in filter) {
                        return String(fieldVal ?? '').toLowerCase().includes(filter.contains.toLowerCase());
                    }
                    return fieldVal === filter;
                });
            }
        }

        // Apply sorting
        if (query.sort && query.sort.length > 0) {
            result.sort((a, b) => {
                for (const { field, direction } of query.sort!) {
                    const aVal = this.getFieldValue(a, field);
                    const bVal = this.getFieldValue(b, field);

                    // Handle undefined values
                    if (aVal == null && bVal == null) continue;
                    if (aVal == null) return direction === 'asc' ? 1 : -1;
                    if (bVal == null) return direction === 'asc' ? -1 : 1;

                    const cmp = aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
                    if (cmp !== 0) return direction === 'asc' ? cmp : -cmp;
                }
                return 0;
            });
        }

        // Get total count after filtering but before pagination
        const total = result.length;

        // Apply pagination
        const start = query.page * query.pageSize;
        const paged = result.slice(start, start + query.pageSize);

        console.log(`[CustomApiDataSource] Returning ${paged.length} of ${total} items`);

        return { data: paged, total };
    }

    /**
     * Helper to extract nested field values
     */
    private getFieldValue(obj: any, field: string): any {
        return field.split('.').reduce((o, key) => o != null ? o[key] : undefined, obj);
    }
}
