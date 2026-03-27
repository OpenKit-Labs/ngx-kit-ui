import { Component, Input } from '@angular/core';
import { KitGridFooterRenderer } from '../kit-grid-footer-renderer.model';
import { KitGridResult } from '../../../models/kit-grid-result.model';
import { KitGridQuery } from '../../../models/kit-grid-query.model.model';
import { KitLayoutModule } from '../../../../../layout/layout.module';
import { KitButtonModule } from '../../../../../button/button.module';
import { KitTextModule } from '../../../../../text/text.module';

export interface KitGridDefaultFooterRendererConfig {
    /** Whether the page X of Y label is shown. Defaults to true. */
    showPageInfo?: boolean;
}

@Component({
    selector: 'kit-grid-default-footer',
    standalone: true,
    imports: [KitLayoutModule, KitTextModule, KitButtonModule],
    templateUrl: './kit-grid-default-footer-renderer.component.html',
    styleUrls: ['./kit-grid-default-footer-renderer.component.scss']
})
export class KitGridDefaultFooterRendererComponent implements KitGridFooterRenderer<KitGridDefaultFooterRendererConfig> {
    @Input() result!: KitGridResult<any>;
    @Input() query!: KitGridQuery;
    @Input() onQueryChange!: (query: KitGridQuery) => void;
    @Input() config?: KitGridDefaultFooterRendererConfig;

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
