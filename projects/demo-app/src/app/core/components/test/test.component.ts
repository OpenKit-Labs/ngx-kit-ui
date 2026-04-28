import { Component, signal } from '@angular/core';
import { KitDataModule, KitLayoutModule, KitTextModule, KitDataGridTypes, KitDataGridRenderers, KitDataGridDataSources } from '../../../../../../ngx-kit-ui/src/public-api';

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

  // ── Hardcoded data ────────────────────────────────────────────────────────
  hardcodedData: User[] = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', joined: new Date('2023-01-15'), location: { city: 'New York', code: 'NY' } },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', joined: new Date('2023-02-20'), location: { city: 'Los Angeles', code: 'CA' } },
    { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', joined: new Date('2023-03-10'), location: { city: 'Chicago', code: 'IL' } },
    { id: 4, name: 'Alice Williams', email: 'alice.williams@example.com', joined: new Date('2023-04-05'), location: { city: 'San Francisco', code: 'CA' } },
    { id: 5, name: 'Michael Brown', email: 'michael.brown@example.com', joined: new Date('2023-05-15'), location: { city: 'Miami', code: 'FL' } },
  ];

  // ── Grid 1: Hardcoded data (static) ─────────────────────────────────────────
  hardcodedDataSource = new KitDataGridDataSources.KitDataGridInMemoryDataSource<User>();

  // ── Grid 2: Reactive signal data (auto-updates) ────────────────────────────
  reactiveUsers$ = signal<User[]>(this.hardcodedData);
  reactiveDataSource = new KitDataGridDataSources.KitDataGridInMemoryDataSource<User>();

  constructor() {
    // Grid 1: Pass hardcoded array directly
    this.hardcodedDataSource.setData([
      { id: 1, name: 'John Doe', email: 'john.doe@example.com', joined: new Date('2023-01-15'), location: { city: 'New York', code: 'NY' } },
      { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', joined: new Date('2023-02-20'), location: { city: 'Los Angeles', code: 'CA' } },
      { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', joined: new Date('2023-03-10'), location: { city: 'Chicago', code: 'IL' } },
      { id: 4, name: 'Alice Williams', email: 'alice.williams@example.com', joined: new Date('2023-04-05'), location: { city: 'San Francisco', code: 'CA' } },
      { id: 5, name: 'Michael Brown', email: 'michael.brown@example.com', joined: new Date('2023-05-15'), location: { city: 'Miami', code: 'FL' } },
    ]);

    // Grid 2: Pass the SIGNAL directly (not the value)
    // The datasource will detect it's a signal and handle reactivity internally
    this.reactiveDataSource.setData(this.reactiveUsers$);
  }

  // Shared config for both grids
  gridConfig: KitDataGridTypes.KitDataGridConfig<User> = {
    columns: [
      {
        field: 'name',
        title: 'Name',
        headerRenderer: KitDataGridRenderers.KitDataGridBuiltinHeaderRenderers.Control({ sortable: true, searchable: true }),
      },
      {
        field: 'email',
        title: 'Email',
      },
      {
        field: 'joined',
        title: 'Joined',
        cellRenderer: KitDataGridRenderers.KitDataGridBuiltinCellRenderers.TimeAgo(),
      },
      {
        field: 'location.city',
        title: 'City',
        headerRenderer: KitDataGridRenderers.KitDataGridBuiltinHeaderRenderers.Control({ sortable: true, searchable: false }),
      },
    ],
    rows: { height: 50 },
    height: 'viewport'
  };

  // ── Event handlers ────────────────────────────────────────────────────────

  onGridQueryChange(gridName: string, query: KitDataGridTypes.KitDataGridQuery): void {
    console.log(`[${gridName}] queryChange`, query);
  }

  onGridRowClick(gridName: string, event: KitDataGridTypes.KitDataGridRowClickEvent<User>): void {
    console.log(`[${gridName}] rowClick — ${event.row.name}`, event.row);
  }

  // ── Actions for signal-based grid ──────────────────────────────────────────

  addUserToSignal(): void {
    const newUser: User = {
      id: 10 + Math.floor(Math.random() * 100),
      name: 'Eva Martinez',
      email: 'eva.martinez@example.com',
      joined: new Date(),
      location: { city: 'Miami', code: 'FL' }
    };

    this.reactiveUsers$.set([...this.reactiveUsers$(), newUser]);
    console.log('[signal-grid] Added user:', newUser);
  }

  clearSignalData(): void {
    this.reactiveUsers$.set([]);
    console.log('[signal-grid] Cleared data');
  }

  resetSignalData(): void {
    this.reactiveUsers$.set(this.hardcodedData);
    console.log('[signal-grid] Reset to original data');
  }
}
