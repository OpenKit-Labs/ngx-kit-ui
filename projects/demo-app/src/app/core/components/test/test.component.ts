import { Component } from '@angular/core';
import {
  KitDataGridBuiltinCellRenderers,
  KitDataGridBuiltinHeaderRenderers,
  KitDataGridBuiltinFooterRenderers,
  KitDataGridConfig,
  KitDataGridQuery,
  KitDataGridRowClickEvent,
  KitDataGridCellActionEvent,
  KitDataGridInMemoryDataSource,
  KitTextModule,
  KitButtonModule,
  KitDataModule,
  KitInputModule,
  KitLayoutModule,
  KitNavigationModule,
  KitOverlaysModule,
  KitPanelModule,
  KitDataGridCustomRenderers,
} from '../../../../../../ngx-kit-ui/src/public-api';
import {
  CustomButtonCellComponent,
  CustomButtonCellAction,
} from '../../../feature/components/data/grid-demo/custom-button-cell/custom-button-cell.component';

interface User {
  id: number;
  name: string;
  email: string;
  joined: Date;
  location: {
    city: string;
    code: string;
  };
}

@Component({
  selector: 'lib-test',
  standalone: true,
  imports: [
    KitTextModule, KitButtonModule, KitPanelModule, KitLayoutModule,
    KitNavigationModule, KitDataModule, KitOverlaysModule, KitInputModule,
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {

  sampleData: User[] = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', joined: new Date('2023-01-15'), location: { city: 'New York', code: 'NY' } },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', joined: new Date('2023-02-20'), location: { city: 'Los Angeles', code: 'CA' } },
    { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', joined: new Date('2023-03-10'), location: { city: 'Chicago', code: 'IL' } },
    { id: 4, name: 'Alice Williams', email: 'alice.williams@example.com', joined: new Date('2023-04-05'), location: { city: 'San Francisco', code: 'CA' } },
  ];

  dataSource = new KitDataGridInMemoryDataSource<User>(this.sampleData);

  config: KitDataGridConfig<User> = {
    columns: [
      {
        field: 'name',
        title: 'Name',
        headerRenderer: KitDataGridBuiltinHeaderRenderers.Control({ sortable: true, searchable: true }),
      },
      {
        field: 'joined',
        title: 'Joined',
        cellRenderer: KitDataGridBuiltinCellRenderers.TimeAgo(),
      },
      {
        field: 'email',
        title: 'Email',
      },
      {
        field: 'location.city',
        title: 'City',
        headerRenderer: KitDataGridBuiltinHeaderRenderers.Control({ sortable: true, searchable: false }),
      },
      {
        // Custom cell renderer — emits action events back to the host via (cellAction)
        field: 'name',
        title: 'Actions',
        cellRenderer: KitDataGridCustomRenderers.cell(CustomButtonCellComponent, { color: 'primary' }),
      },
    ],
    rows: { height: 60 },
    height: 'viewport',
    footer: KitDataGridBuiltinFooterRenderers.Default({ showPageInfo: true }),
  };

  // ── Output handlers ────────────────────────────────────────────────────────

  /** Fires on every sort, filter, or page change. */
  onQueryChange(query: KitDataGridQuery): void {
    console.log('[grid] queryChange', query);
  }

  /** Fires when the user clicks a row. */
  onRowClick(event: KitDataGridRowClickEvent<User>): void {
    console.log(`[grid] rowClick — row ${event.rowIndex}:`, event.row.name, event);
  }

  /**
   * Fires when a custom cell renderer emits on its @Output() action.
   * The payload is typed by the renderer; cast it to the renderer's action type
   * for full intellisense.
   */
  onCellAction(event: KitDataGridCellActionEvent<User>): void {
    const action = event.payload as CustomButtonCellAction;

    switch (action.type) {
      case 'view':
        console.log(`[grid] view user:`, event.row);   // event.row is User — fully typed
        break;
      case 'delete':
        console.log(`[grid] delete user id:`, event.row.id);
        break;
    }
  }
}
