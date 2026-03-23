import { Component, OnInit } from '@angular/core';

import {
    KitGridDataSource,
    KitGridInMemoryDataSource,
    KitGridColumn,
    KitGridConfig,
    KitDataGridComponent,
    KitLayoutModule,
    KitTextModule
} from '../../../../../../../ngx-kit-ui/src/public-api';

interface DemoUser {
    name: string;
    email: string;
    status: string;
    role: string;
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
        row: { minHeight: 48, maxHeight: 69 }
    };

    columns: KitGridColumn<DemoUser>[] = [
        { field: 'name', title: 'Name', minWidth: 160 },
        { field: 'email', title: 'Email', minWidth: 220 },
        { field: 'status', title: 'Status', absoluteWidth: 120 },
        { field: 'role', title: 'Role', },
    ];

    private readonly allUsers: DemoUser[] = [
        { name: 'Alice Johnson with a super long name', email: 'alice@example.com', status: 'Active', role: 'Admin' },
        { name: 'Bob Smith', email: 'bob@example.com', status: 'Active', role: 'User' },
        { name: 'Carol White', email: 'carol@example.com', status: 'Inactive', role: 'User' },
        { name: 'David Brown', email: 'david@example.com', status: 'Active', role: 'Moderator' },
        { name: 'Eva Green', email: 'eva@example.com', status: 'Inactive', role: 'User' },
        { name: 'Frank Black', email: 'frank@example.com', status: 'Active', role: 'Admin' },
        { name: 'Grace Miller', email: 'grace@example.com', status: 'Active', role: 'User' },
        { name: 'Henry Ford', email: 'henry@example.com', status: 'Inactive', role: 'User' },
        { name: 'Isabella Ross', email: 'isabella@example.com', status: 'Active', role: 'Moderator' },
        { name: 'Jack Daniels', email: 'jack@example.com', status: 'Active', role: 'User' },
        { name: 'Kelly Clarkson', email: 'kelly@example.com', status: 'Inactive', role: 'User' },
        { name: 'Liam Neeson', email: 'liam@example.com', status: 'Active', role: 'Admin' },
    ];

    ngOnInit(): void {
        this.dataSource = new KitGridInMemoryDataSource<DemoUser>(this.allUsers);
    }
}
