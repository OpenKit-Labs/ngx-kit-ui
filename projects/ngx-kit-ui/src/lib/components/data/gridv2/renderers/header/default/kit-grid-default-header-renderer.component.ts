import { Component, Input } from '@angular/core';
import { KitGridHeaderRenderer } from '../kit-grid-header-renderer';
import { KitButtonModule, KitInputModule, KitLayoutModule, KitTextModule } from 'ngx-kit-ui';
import { KitGridQuery } from '../../../models/kit-grid-query.model.model';

type SortState = 'none' | 'asc' | 'desc';

export interface KitGridDefaultHeaderRendererConfig {
    /** Whether the sort control is shown. Defaults to true. */
    sortable?: boolean;
    /** Whether the search control is shown. Defaults to true. */
    searchable?: boolean;
}

@Component({
    selector: 'kit-grid-default-header',
    standalone: true,
    imports: [KitLayoutModule, KitInputModule, KitButtonModule, KitTextModule],
    templateUrl: './kit-grid-default-header-renderer.component.html',
    styleUrls: ['./kit-grid-default-header-renderer.component.scss']
})
export class KitGridDefaultHeaderRendererComponent implements KitGridHeaderRenderer<KitGridDefaultHeaderRendererConfig> {
    @Input() title!: string;
    @Input() field!: string;
    @Input() query!: KitGridQuery;
    @Input() onQueryChange!: (query: KitGridQuery) => void;
    @Input() config?: KitGridDefaultHeaderRendererConfig;

    searching = false;
    searchValue = '';

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
        const filters = { ...(this.query?.filters ?? {}) };
        if (value) {
            filters[this.field] = { contains: value };
        } else {
            delete filters[this.field];
        }
        this.onQueryChange({ ...this.query, page: 0, filters });
    }
}
