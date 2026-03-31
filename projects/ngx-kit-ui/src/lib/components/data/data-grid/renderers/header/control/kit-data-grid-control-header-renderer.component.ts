import { Component, Input } from '@angular/core';
import { KitDataGridQuery } from '../../../models/data-source/kit-data-grid-query.model';
import { KitLayoutModule } from '../../../../../layout/layout.module';
import { KitInputModule } from '../../../../../inputs/input.module';
import { KitButtonModule } from '../../../../../button/button.module';
import { KitTextModule } from '../../../../../text/text.module';
import { KitDataGridHeaderRenderer } from '../../../models/renderers/kit-data-grid-header-renderer';

type SortState = 'none' | 'asc' | 'desc';

export interface KitDataGridControlHeaderRendererConfig {
    /** Whether the sort control is shown. Defaults to true. */
    sortable?: boolean;
    /** Whether the search control is shown. Defaults to true. */
    searchable?: boolean;
}

@Component({
    selector: 'kit-data-grid-control-header',
    standalone: true,
    imports: [KitLayoutModule, KitInputModule, KitButtonModule, KitTextModule],
    templateUrl: './kit-data-grid-control-header-renderer.component.html',
    styleUrls: ['./kit-data-grid-control-header-renderer.component.scss']
})
export class KitDataGridControlHeaderRendererComponent implements KitDataGridHeaderRenderer<KitDataGridControlHeaderRendererConfig> {
    @Input() title!: string;
    @Input() field!: string;
    @Input() query!: KitDataGridQuery;
    @Input() onQueryChange!: (query: KitDataGridQuery) => void;
    @Input() config?: KitDataGridControlHeaderRendererConfig;

    searching = false;
    searchValue = '';

    get isSortable(): boolean {
        return this.config?.sortable !== false;
    }

    get isSearchable(): boolean {
        return this.config?.searchable !== false;
    }

    get sortIconPath(): string {
        if (this.sortState === 'asc') return 'M8 13V3M5 6l3-3 3 3';
        if (this.sortState === 'desc') return 'M8 3v10M5 10l3 3 3-3';
        return 'M8 3v10M5 6l3-3 3 3M5 10l3 3 3-3';
    }

    get sortState(): SortState {
        const entry = this.query?.sort?.find(s => s.field === this.field);
        return entry ? entry.direction : 'none';
    }

    toggleSearch(): void {
        this.searching = !this.searching;
        if (!this.searching && this.searchValue) {
            this.searchValue = '';
            this.applySearch('');
        }
    }

    onSearchChange(value: string): void {
        this.searchValue = value;
        this.applySearch(value);
    }

    cycleSortState(): void {
        const next: SortState = this.sortState === 'none' ? 'asc' : this.sortState === 'asc' ? 'desc' : 'none';
        const existing = (this.query?.sort ?? []).filter(s => s.field !== this.field);
        const newSort = next === 'none' ? existing : [...existing, { field: this.field, direction: next }];
        this.onQueryChange({ ...this.query, page: 0, sort: newSort });
    }

    private applySearch(value: string): void {
        const existing = (this.query?.filters ?? []).filter(f => f.field !== this.field);
        const newFilters = value
            ? [...existing, { field: this.field, filter: { contains: value } }]
            : existing;
        this.onQueryChange({ ...this.query, page: 0, filters: newFilters });
    }
}
