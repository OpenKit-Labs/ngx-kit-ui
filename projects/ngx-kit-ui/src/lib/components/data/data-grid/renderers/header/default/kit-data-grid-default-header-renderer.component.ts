import { Component, Input } from '@angular/core';
import { KitDataGridQuery } from '../../../models/data-source/kit-data-grid-query.model';
import { KitLayoutModule } from '../../../../../layout/layout.module';
import { KitTextModule } from '../../../../../text/text.module';
import { KitDataGridHeaderRenderer } from '../../../models/renderers/kit-data-grid-header-renderer';

@Component({
    selector: 'kit-data-grid-default-header',
    standalone: true,
    imports: [KitLayoutModule, KitTextModule],
    templateUrl: './kit-data-grid-default-header-renderer.component.html',
    styleUrls: ['./kit-data-grid-default-header-renderer.component.scss']
})
export class KitDataGridDefaultHeaderRendererComponent implements KitDataGridHeaderRenderer {
    @Input() title!: string;
    @Input() field!: string;
    @Input() query!: KitDataGridQuery;
    @Input() onQueryChange!: (query: KitDataGridQuery) => void;
    @Input() config?: any;
}

