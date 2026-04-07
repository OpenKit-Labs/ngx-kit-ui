import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { KitDataModule, KitLayoutModule, KitTextModule, KitDataGridTypes, KitDataGridRenderers, KitDataGridDataSources } from '../../../../../../ngx-kit-ui/src/public-api';
import { CustomApiDataSource } from './custom-api.data-source';


interface User {
  id: number;
  name: string;
  email: string;
  joined: Date;
  location: {
    city: string | undefined;
    code: string | undefined;
  };
}

/**
 * Example custom button cell action type
 * Replace this with your own action type
 */
interface CustomButtonCellAction {
  type: 'view' | 'delete';
}

/**
 * Example custom button cell component
 * Implements KitDataGridCellRenderer to provide custom cell rendering with actions
 * Replace this with your own custom cell implementation
 */
@Component({
  selector: 'app-custom-button-cell',
  standalone: true,
  template: `
    <div style="display: flex; gap: 8px;">
      <button (click)="onAction('view')">View</button>
      <button (click)="onAction('delete')">Delete</button>
    </div>
  `,
})
class CustomButtonCellComponent {
  @Input() value: any;
  @Input() row: User | any;
  @Input() rowIndex: number = 0;
  @Input() config?: { color: string };
  @Output() action = new EventEmitter<CustomButtonCellAction>();

  onAction(type: 'view' | 'delete') {
    this.action.emit({ type });
  }
}

@Component({
  selector: 'lib-test',
  standalone: true,
  imports: [
    KitLayoutModule, KitDataModule, KitTextModule
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {

  sampleData: any[] = [
    { id: 5, name: 'Michael Brown', email: 'michael.brown@example.com', joined: new Date('2023-05-15'), location: { code: 'FL' } },
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', joined: new Date('2023-01-15'), location: { city: 'New York', code: 'NY' } },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', joined: new Date('2023-02-20'), location: { city: 'Los Angeles', code: 'CA' } },
    { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', joined: new Date('2023-03-10'), location: { city: 'Chicago', code: 'IL' } },
    { id: 4, name: 'Alice Williams', email: 'alice.williams@example.com', joined: new Date('2023-04-05'), location: { city: 'San Francisco', code: 'CA' } },
  ];

  // ── Example 1: Plain array data source (traditional approach)
  dataSource = new KitDataGridDataSources.KitDataGridInMemoryDataSource<User>();

  // ── Example 2: Reactive signal-based data source (recommended for mutable data)
  reactiveUsers$ = signal<User[]>(this.sampleData);
  reactiveDataSource = new KitDataGridDataSources.KitDataGridInMemoryDataSource<User>();

  // Custom API DataSource - shows how to extend the base class
  customApiDataSource = new CustomApiDataSource();

  constructor() {
    // Set the data using the new setData method
    this.dataSource.setData(this.sampleData);

    // Bind the signal to the reactive data source
    // Now when reactiveUsers$ changes, the grid will automatically update
    this.reactiveDataSource.setData(this.reactiveUsers$);
  }

  config: KitDataGridTypes.KitDataGridConfig<User> = {
    columns: [
      {
        field: 'name',
        title: 'Name',
        headerRenderer: KitDataGridRenderers.KitDataGridBuiltinHeaderRenderers.Control({ sortable: true, searchable: true }),
      },
      {
        field: 'joined',
        title: 'Joined',
        cellRenderer: KitDataGridRenderers.KitDataGridBuiltinCellRenderers.TimeAgo(),
      },
      {
        field: 'email',
        title: 'Email',
      },
      {
        field: 'location.city',
        title: 'City',
        headerRenderer: KitDataGridRenderers.KitDataGridBuiltinHeaderRenderers.Control({ sortable: true, searchable: false }),
      },
      {
        // Custom cell renderer — emits action events back to the host via (cellAction)
        field: 'name',
        title: 'Actions',
        cellRenderer: KitDataGridRenderers.KitDataGridCustomRenderers.cell(CustomButtonCellComponent, { color: 'primary' }),
      },
    ],
    rows: { height: 60 },
    height: 'viewport'
  };

  // Separate config for the second grid - use fixed height instead of viewport
  // so it doesn't compete for viewport space with other content
  customApiConfig: KitDataGridTypes.KitDataGridConfig<User> = {
    columns: [
      {
        field: 'name',
        title: 'Name',
        headerRenderer: KitDataGridRenderers.KitDataGridBuiltinHeaderRenderers.Control({ sortable: true, searchable: true }),
      },
      {
        field: 'joined',
        title: 'Joined',
        cellRenderer: KitDataGridRenderers.KitDataGridBuiltinCellRenderers.TimeAgo(),
      },
      {
        field: 'email',
        title: 'Email',
      },
      {
        field: 'location.city',
        title: 'City',
        headerRenderer: KitDataGridRenderers.KitDataGridBuiltinHeaderRenderers.Control({ sortable: true, searchable: false }),
      },
      {
        field: 'name',
        title: 'Actions',
        cellRenderer: KitDataGridRenderers.KitDataGridCustomRenderers.cell(CustomButtonCellComponent, { color: 'primary' }),
      },
    ],
    rows: { height: 60 },
    height: 'viewport' // Fixed height instead of viewport
  };

  // ── Output handlers ────────────────────────────────────────────────────────

  /** Fires on every sort, filter, or page change. */
  onQueryChange(query: KitDataGridTypes.KitDataGridQuery): void {
    console.log('[grid] queryChange', query);
  }

  /** Custom API datasource query change handler - shows how custom implementations work */
  onCustomApiQueryChange(query: KitDataGridTypes.KitDataGridQuery): void {
    console.log('[custom-api-grid] queryChange', query);
  }

  /** Fires when the user clicks a row. */
  onRowClick(event: KitDataGridTypes.KitDataGridRowClickEvent<User>): void {
    console.log(`[grid] rowClick — row ${event.rowIndex}:`, event.row.name, event);
  }

  /**
   * Fires when a custom cell renderer emits on its @Output() action.
   * The payload is typed by the renderer; cast it to the renderer's action type
   * for full intellisense.
   */
  onCellAction(event: KitDataGridTypes.KitDataGridCellActionEvent<User>): void {
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

  // ── Reactive signal examples ─────────────────────────────────────────────────

  /**
   * Example: Update the reactive signal to add a new user.
   * The grid will automatically refresh thanks to the signal binding.
   */
  addUserExample(): void {
    const newUser: User = {
      id: 10,
      name: 'Eva Martinez',
      email: 'eva.martinez@example.com',
      joined: new Date(),
      location: { city: 'Miami', code: 'FL' }
    };

    // Update signal - grid auto-refreshes
    this.reactiveUsers$.set([...this.reactiveUsers$(), newUser]);
    console.log('[reactive-grid] Added user:', newUser);
  }

  /**
   * Example: Replace all data in the reactive signal.
   * The grid will automatically refresh.
   */
  replaceDataExample(): void {
    const newData: User[] = [
      { id: 20, name: 'Emma Thompson', email: 'emma.thompson@example.com', joined: new Date(), location: { city: 'London', code: 'GB' } },
      { id: 21, name: 'Oliver Smith', email: 'oliver.smith@example.com', joined: new Date(), location: { city: 'Manchester', code: 'GB' } },
    ];

    // Replace all data - grid auto-refreshes
    this.reactiveUsers$.set(newData);
    console.log('[reactive-grid] Data replaced:', newData);
  }
}
