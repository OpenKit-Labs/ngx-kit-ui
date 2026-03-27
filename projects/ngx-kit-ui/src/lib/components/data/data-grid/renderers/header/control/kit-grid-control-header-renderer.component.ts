import { Component, Input } from '@angular/core';
import { KitGridHeaderRenderer } from '../kit-grid-header-renderer';
import { KitGridQuery } from '../../../models/kit-grid-query.model.model';
import { KitLayoutModule } from '../../../../../layout/layout.module';
import { KitInputModule } from '../../../../../inputs/input.module';
import { KitButtonModule } from '../../../../../button/button.module';
import { KitTextModule } from '../../../../../text/text.module';

type SortState = 'none' | 'asc' | 'desc';

export interface KitGridControlHeaderRendererConfig {
    /** Whether the sort control is shown. Defaults to true. */
    sortable?: boolean;
    /** Whether the search control is shown. Defaults to true. */
    searchable?: boolean;
}

@Component({
    selector: 'kit-grid-control-header',
    standalone: true,
    imports: [KitLayoutModule, KitInputModule, KitButtonModule, KitTextModule],
    templateUrl: './kit-grid-control-header-renderer.component.html',
    styleUrls: ['./kit-grid-control-header-renderer.component.scss']
})
export class KitGridControlHeaderRendererComponent implements KitGridHeaderRenderer<KitGridControlHeaderRendererConfig> {
    @Input() title!: string;
    @Input() field!: string;
    @Input() query!: KitGridQuery;
    @Input() onQueryChange!: (query: KitGridQuery) => void;
    @Input() config?: KitGridControlHeaderRendererConfig;

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
        const filters = { ...(this.query?.filters ?? {}) };
        if (value) {
            filters[this.field] = { contains: value };
        } else {
            delete filters[this.field];
        }
        this.onQueryChange({ ...this.query, page: 0, filters });
    }
}
