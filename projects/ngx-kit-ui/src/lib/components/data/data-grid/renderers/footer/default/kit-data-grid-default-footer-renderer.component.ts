import { Component, Input } from '@angular/core';
import { KitDataGridResult } from '../../../models/data-source/kit-data-grid-result.model';
import { KitDataGridQuery } from '../../../models/data-source/kit-data-grid-query.model';
import { KitLayoutModule } from '../../../../../layout/layout.module';
import { KitButtonModule } from '../../../../../button/button.module';
import { KitTextModule } from '../../../../../text/text.module';
import { KitDataGridFooterRenderer } from '../../../models/renderers/kit-data-grid-footer-renderer.model';

export interface KitDataGridDefaultFooterRendererConfig {
    /** Whether the page X of Y label is shown. Defaults to true. */
    showPageInfo?: boolean;
}

@Component({
    selector: 'kit-data-grid-default-footer',
    standalone: true,
    imports: [KitLayoutModule, KitTextModule, KitButtonModule],
    templateUrl: './kit-data-grid-default-footer-renderer.component.html',
    styleUrls: ['./kit-data-grid-default-footer-renderer.component.scss']
})
export class KitDataGridDefaultFooterRendererComponent implements KitDataGridFooterRenderer<KitDataGridDefaultFooterRendererConfig> {
    @Input() result!: KitDataGridResult<any>;
    @Input() query!: KitDataGridQuery;
    @Input() onQueryChange!: (query: KitDataGridQuery) => void;
    @Input() config?: KitDataGridDefaultFooterRendererConfig;

    get totalPages(): number {
        return Math.max(1, Math.ceil(this.result.total / this.query.pageSize));
    }

    prev(): void {
        if (this.query.page > 0) {
            this.onQueryChange({ ...this.query, page: this.query.page - 1 });
        }
    }

    next(): void {
        if (this.query.page < this.totalPages - 1) {
            this.onQueryChange({ ...this.query, page: this.query.page + 1 });
        }
    }
}
