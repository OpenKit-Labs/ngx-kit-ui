import { Component, OnInit } from '@angular/core';

import {
    KitGridDataSource,
    KitGridInMemoryDataSource,
    KitGridColumn,
    KitGridConfig,
    KitDataGridComponent,
    KitLayoutModule,
    KitTextModule,
    KitGridBuiltinCellRenderers,
    KitGridBuiltinHeaderRenderers,
    KitGridBuiltinFooterRenderers,
    kitCellRenderer,
} from '../../../../../../../ngx-kit-ui/src/public-api';
import { CustomButtonCellComponent } from './custom-button-cell/custom-button-cell.component';
import sampleData from './sample-dataset.json';

interface DemoUser {
    id: number;
    full_name: string;
    email: string;
    status: string;
    joined_date: string;
    location: { city: string, country: string };
    tags: string[];
}

@Component({
    selector: 'app-grid-demo',
    templateUrl: './data-grid-demo.component.html',
    styleUrls: ['./data-grid-demo.component.scss'],
    standalone: true,
    imports: [KitDataGridComponent, KitLayoutModule, KitTextModule],
})
export class DataGridDemoComponent implements OnInit {

    dataSource!: KitGridDataSource<DemoUser>;

    config: KitGridConfig = {
        row: { minHeight: 48, maxHeight: 69 },
        footer: KitGridBuiltinFooterRenderers.Default({ showPageInfo: true }),
        height: 'viewport',
    };

    columns: KitGridColumn<DemoUser>[] = [
        { field: 'full_name', title: 'Name', minWidth: 160 },
        { field: 'email', title: 'Email', minWidth: 220 },
        { field: 'status', title: 'Status' },
        {
            field: 'joined_date',
            title: 'Joined',
            cellRenderer: KitGridBuiltinCellRenderers.TimeAgo(),
            headerRenderer: KitGridBuiltinHeaderRenderers.Control({ sortable: true, searchable: false }),
        },
        {
            field: 'location.city',
            title: 'City',
            headerRenderer: KitGridBuiltinHeaderRenderers.Control({ sortable: false }),
        },
        { field: 'location.country', title: 'Country' },
        { field: 'location', title: 'Location' },
        { field: 'Undefined', title: 'Undefined Field Value' },
        { field: 'tags', title: 'Tags', cellRenderer: kitCellRenderer(CustomButtonCellComponent, { color: 'primary' }) },
    ];

    ngOnInit(): void {
        this.dataSource = new KitGridInMemoryDataSource<DemoUser>(sampleData.users as DemoUser[]);
    }
}
