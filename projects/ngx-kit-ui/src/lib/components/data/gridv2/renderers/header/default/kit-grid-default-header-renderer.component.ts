import { Component, Input } from '@angular/core';
import { KitGridHeaderRenderer } from '../kit-grid-header-renderer';
import { KitLayoutModule, KitTextModule } from 'ngx-kit-ui';
import { KitGridQuery } from '../../../models/kit-grid-query.model.model';

@Component({
    selector: 'kit-grid-default-header',
    standalone: true,
    imports: [KitLayoutModule, KitTextModule],
    templateUrl: './kit-grid-default-header-renderer.component.html',
    styleUrls: ['./kit-grid-default-header-renderer.component.scss']
})
export class KitGridDefaultHeaderRendererComponent implements KitGridHeaderRenderer {
    @Input() title!: string;
    @Input() field!: string;
    @Input() query!: KitGridQuery;
    @Input() onQueryChange!: (query: KitGridQuery) => void;
    @Input() config?: any;
}

