import { Component, OnInit } from '@angular/core';

import {
    KitDataGridComponent,
    KitDataGridTypes,
    KitDataGridRenderers,
    KitDataGridDataSources,
    KitLayoutModule,
    KitTextModule,
    SimpleTableComponent,
} from '../../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../../shared/code-block/code-block.component';
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
    imports: [KitDataGridComponent, KitLayoutModule, KitTextModule, CodeBlockComponent, SimpleTableComponent],
})
export class DataGridDemoComponent implements OnInit {

    // ── Data sources ──────────────────────────────────────────────────────────
    dataSource!: KitDataGridTypes.KitDataGridDataSource<DemoUser>;
    autoDataSource!: KitDataGridTypes.KitDataGridDataSource<DemoUser>;
    fixedDataSource!: KitDataGridTypes.KitDataGridDataSource<DemoUser>;
    customDataSource!: KitDataGridTypes.KitDataGridDataSource<DemoUser>;

    // ── Configs ───────────────────────────────────────────────────────────────
    basicConfig: KitDataGridTypes.KitDataGridConfig<DemoUser> = {
        columns: [
            { field: 'full_name', title: 'Name' },
            { field: 'email', title: 'Email' },
            { field: 'status', title: 'Status' },
            { field: 'location.city', title: 'City' },
            { field: 'location.country', title: 'Country' },
        ],
        rows: { height: 48 },
        footer: KitDataGridRenderers.KitDataGridBuiltinFooterRenderers.Default({ showPageInfo: true }),
        height: 'auto',
    };

    viewportConfig: KitDataGridTypes.KitDataGridConfig<DemoUser> = {
        columns: [
            { field: 'full_name', title: 'Name', minWidth: 160 },
            { field: 'email', title: 'Email', minWidth: 220, maxWidth: 400 },
            { field: 'status', title: 'Status', absoluteWidth: 100 },
            {
                field: 'joined_date',
                title: 'Joined',
                cellRenderer: KitDataGridRenderers.KitDataGridBuiltinCellRenderers.TimeAgo(),
                headerRenderer: KitDataGridRenderers.KitDataGridBuiltinHeaderRenderers.Control({ sortable: true, searchable: false }),
            },
            {
                field: 'location.city',
                title: 'City',
                headerRenderer: KitDataGridRenderers.KitDataGridBuiltinHeaderRenderers.Control({ sortable: true }),
            },
            { field: 'location.country', title: 'Country' },
        ],
        rows: { minHeight: 48, maxHeight: 69 },
        footer: KitDataGridRenderers.KitDataGridBuiltinFooterRenderers.Default({ showPageInfo: true }),
        height: 'viewport',
    };

    fixedConfig: KitDataGridTypes.KitDataGridConfig<DemoUser> = {
        columns: [
            { field: 'full_name', title: 'Name' },
            { field: 'email', title: 'Email' },
            { field: 'status', title: 'Status' },
            { field: 'location.city', title: 'City' },
            { field: 'location.country', title: 'Country' },
        ],
        rows: { height: 48 },
        footer: KitDataGridRenderers.KitDataGridBuiltinFooterRenderers.Default({ showPageInfo: true }),
        height: 400,
    };

    noFooterConfig: KitDataGridTypes.KitDataGridConfig<DemoUser> = {
        columns: [
            { field: 'full_name', title: 'Name' },
            { field: 'email', title: 'Email' },
            { field: 'status', title: 'Status' },
            { field: 'location.city', title: 'City' },
            { field: 'location.country', title: 'Country' },
        ],
        rows: { height: 48 },
        height: 'auto',
        footer: {
            ...KitDataGridRenderers.KitDataGridBuiltinFooterRenderers.Default({ showPageInfo: true }),
            isVisible: false,
        },
    };

    customConfig: KitDataGridTypes.KitDataGridConfig<DemoUser> = {
        columns: [
            { field: 'full_name', title: 'Name' },
            { field: 'status', title: 'Status' },
            { field: 'tags', title: 'Tags', cellRenderer: KitDataGridRenderers.KitDataGridCustomRenderers.cell(CustomButtonCellComponent, { color: 'primary' }) },
        ],
        rows: { height: 48 },
        footer: KitDataGridRenderers.KitDataGridBuiltinFooterRenderers.Default({ showPageInfo: true }),
        height: 'auto',
    };

    // ── Usage code snippets ───────────────────────────────────────────────────
    importModule = `import { KitDataGridModule } from '@openkit-labs/ngx-kit-ui';`;
    importComponent = `import { KitDataGridComponent } from '@openkit-labs/ngx-kit-ui';`;
    importDataSource = `import { KitDataGridDataSources } from '@openkit-labs/ngx-kit-ui';`;

    usageBasic = `<kit-data-grid
  [dataSource]="dataSource"
  [config]="config">
</kit-data-grid>`;

    usageDataSource = `import { KitDataGridConfig, KitDataGridDataSources } from '@openkit-labs/ngx-kit-ui';

interface User {
  id: number;
  name: string;
  email: string;
}

// In your component:
dataSource = new KitDataGridDimport { KitDataGridConfig } from '@openkit-labs/ngx-kit-ui';

config: KitDataGridConfig.es.KitDataGridInMemoryDataSource<User>(users);`;

    usageCustomColumnDefs = `import { KitDataGridTypes } from '@openkit-labs/ngx-kit-ui';

config: KitDataGridTypesKitDataGridConfig<User> = {
  columns: [
    { field: 'name',  title: 'Full Name', minWidth: 160 },
    { field: 'email', title: 'Email',     minWidth: 220, maxWidth: 400 },
    { field: 'role',  title: 'Role',      absoluteWidth: 120 },
  ],
};`;

    usageBuiltinRenderers = `import {
  KitDataGridTypes,
  KitDataGridRenderers,
} from '@openkit-labs/ngx-kit-ui';

config: KitDataGridTypes.KitDataGridConfig<User> = {
  columns: [
    {
      field: 'created_at',
      title: 'Created',
      cellRenderer:   KitDataGridRenderers.KitDataGridBuiltinCellRenderers.TimeAgo(),
      headerRenderer: KitDataGridRenderers.KitDataGridBuiltinHeaderRenderers.Control({ sortable: true, searchable: false }),
    },
  ],
  footer: KitDataGridRenderers.KitDataGridBuiltinFooterRenderers.Default({ showPageInfo: true }),
};`;

    usageCustomRenderer = `import { KitDataGridTypes, KitDataGridRenderers } from '@openkit-labs/ngx-kit-ui';
import { Component, Input } from '@angular/core';

// 1. Implement the KitDataGridCellRenderer interface
@Component({
  selector: 'app-status-cell',
  template: \`<span [class]="'badge badge-' + value">{{ value }}</span>\`,
  standalone: true,
})
export class StatusCellComponent {
  @Input() value!: string;
  @Input() row!: any;
  @Input() rowIndex!: number;
  @Input() config?: void;
}

// 2. Reference it with KitDataGridRenderers.KitDataGridCustomRenderers.cell()
config: KitDataGridTypes.KitDataGridConfig<User> = {
  columns: [
    {
      field: 'status',
      title: 'Status',
      cellRenderer: KitDataGridRenderers.KitDataGridCustomRenderers.cell(StatusCellComponent),
    },
  ],
};`;

    usageCustomRendererWithConfig = `import { KitDataGridTypes, KitDataGridRenderers } from '@openkit-labs/ngx-kit-ui';
import { Component, Input } from '@angular/core';

// Config-aware custom cell renderer
export interface BadgeCellConfig {
  color: 'primary' | 'danger' | 'success';
}

@Component({
  selector: 'app-badge-cell',
  template: \`<button [class]="config?.color ?? 'primary'">{{ value }}</button>\`,
  standalone: true,
})
export class BadgeCellComponent {
  @Input() value!: string;
  @Input() row!: any;
  @Input() rowIndex!: number;
  @Input() config?: BadgeCellConfig;
}

// Pass config as the second argument to KitDataGridRenderers.KitDataGridCustomRenderers.cell()
config: KitDataGridTypes.KitDataGridConfig<User> = {
  columns: [
    {
      field: 'status',
      title: 'Status',
      cellRenderer: KitDataGridRenderers.KitDataGridCustomRenderers.cell(BadgeCellComponent, { color: 'danger' }),
    },
  ],
};`;

    usageHeightModes = `// Fill the remaining vertical space of the flex parent (default)
config: KitDataGridTypes.KitDataGridConfig<User> = { height: 'flex' };

// Fill from the grid's top edge to the bottom of the viewport
config: KitDataGridTypes.KitDataGridConfig<User> = { height: 'viewport' };

// Shrink-wrap the grid to its content (no scrolling)
config: KitDataGridTypes.KitDataGridConfig<User> = { height: 'auto' };

// Fixed pixel height with internal scrolling
config: KitDataGridTypes.KitDataGridConfig<User> = { height: 400 };`;

    // ── Table definitions ─────────────────────────────────────────────────────
    colDefsDefinition = [
        { title: 'Column', lookupField: 'col' },
        { title: 'Type', lookupField: 'type' },
        { title: 'Description', lookupField: 'description' },
    ];

    componentInputsDefinition = [
        { title: 'Input', lookupField: 'input' },
        { title: 'Type', lookupField: 'type' },
        { title: 'Description', lookupField: 'description' },
    ];

    propDefinition = [
        { title: 'Property', lookupField: 'property' },
        { title: 'Type', lookupField: 'type' },
        { title: 'Default', lookupField: 'default' },
        { title: 'Description', lookupField: 'description' },
    ];

    stylingDefinition = [
        { title: 'Variable', lookupField: 'variable' },
        { title: 'Default', lookupField: 'default' },
        { title: 'Description', lookupField: 'description' },
    ];

    // ── Component inputs ──────────────────────────────────────────────────────
    componentInputsDataset = [
        { input: 'dataSource', type: 'KitDataGridDataSource<T>', description: 'The data source that provides and filters rows.' },
        { input: 'config', type: 'KitDataGridConfig<T>', description: 'All grid configuration: columns, height, row sizing, footer, and optional column defaults.' },
    ];

    // ── KitDataGridColumnConfig props ──────────────────────────────────────────
    columnPropsDataset = [
        { property: 'field', type: 'keyof T | string', default: '—', description: 'Dot-notation path to the data property (e.g. "location.city").' },
        { property: 'title', type: 'string', default: '—', description: 'Column header label.' },
        { property: 'absoluteWidth', type: 'number', default: 'undefined', description: 'Fixed pixel width. Overrides minWidth / maxWidth.' },
        { property: 'minWidth', type: 'number', default: 'undefined', description: 'Minimum column width in pixels. Column stretches up to maxWidth or fills remaining space.' },
        { property: 'maxWidth', type: 'number', default: 'undefined', description: 'Hard pixel cap. Column always reaches this width; use minWidth alone for flexible sizing.' },
        { property: 'cellRenderer', type: 'KitDataGridCellRendererDescriptor', default: 'default', description: 'Descriptor for a custom or built-in cell renderer component.' },
        { property: 'headerRenderer', type: 'KitDataGridHeaderRendererDescriptor', default: 'default', description: 'Descriptor for a custom or built-in header renderer component.' },
    ];

    // ── KitDataGridConfig ──────────────────────────────────────────────────────
    configPropsDataset = [
        { property: 'columns', type: 'KitDataGridColumnConfig<T>[]', default: '—', description: 'Column definitions array.' },
        { property: 'height', type: 'KitDataGridHeightConfig', default: "'flex'", description: "Controls how the grid fills vertical space: 'flex' (default), 'viewport', 'auto', or a pixel number." },
        { property: 'footer', type: 'KitDataGridFooterConfig', default: 'undefined', description: 'Footer renderer descriptor with renderer component and isVisible flag. Omit to hide footer entirely.' },
        { property: 'rows', type: 'KitDataGridRowConfig', default: 'undefined', description: 'Per-row height constraints.' },
    ];

    // ── KitDataGridRowConfig ───────────────────────────────────────────────────
    rowConfigDataset = [
        { property: 'height', type: 'number', default: 'undefined', description: 'Fixed row height in pixels.' },
        { property: 'minHeight', type: 'number', default: 'undefined', description: 'Minimum row height in pixels.' },
        { property: 'maxHeight', type: 'number', default: 'undefined', description: 'Maximum row height in pixels.' },
    ];

    // ── KitDataGridHeightConfig ───────────────────────────────────────────────
    heightModesDataset = [
        { property: "'flex'", type: 'string', default: '✓', description: 'Stretches the grid to fill the remaining height of its flex parent.' },
        { property: "'viewport'", type: 'string', default: '', description: 'Calculates the remaining viewport height from the grid\'s top edge.' },
        { property: "'auto'", type: 'string', default: '', description: 'Shrink-wraps to content. No internal scroll.' },
        { property: 'number', type: 'number', default: '', description: 'Sets an explicit pixel height with internal scrolling.' },
    ];

    // ── Built-in header renderers ─────────────────────────────────────────
    controlHeaderConfigDataset = [
        { property: 'sortable', type: 'boolean', default: 'true', description: 'Shows the sort toggle button.' },
        { property: 'searchable', type: 'boolean', default: 'true', description: 'Shows the search toggle and inline search input.' },
    ];

    // ── Built-in footer renderers ─────────────────────────────────────────
    defaultFooterConfigDataset = [
        { property: 'showPageInfo', type: 'boolean', default: 'false', description: 'Renders "X – Y of Z" page info next to the pagination controls.' },
    ];

    // ── KitDataGridCellRenderer interface ─────────────────────────────────────
    cellRendererInterfaceDataset = [
        { property: 'value', type: 'TValue', default: '—', description: 'The resolved cell value from the column\'s field path.' },
        { property: 'config', type: 'TConfig | undefined', default: 'undefined', description: 'Optional config object, forwarded from KitDataGridCustomRenderers.cell(Component, config).' },
    ];

    // ── KitDataGridHeaderRenderer interface ──────────────────────────────────
    headerRendererInterfaceDataset = [
        { property: 'title', type: 'string', default: '—', description: 'Column title from the column definition.' },
        { property: 'field', type: 'string', default: '—', description: 'Column field key.' },
        { property: 'query', type: 'KitDataGridQuery', default: '—', description: 'Current query state (page, sort, filters).' },
        { property: 'onQueryChange', type: '(query: KitDataGridQuery) => void', default: '—', description: 'Callback to emit a new query and trigger a data-source refresh.' },
        { property: 'config', type: 'TConfig | undefined', default: 'undefined', description: 'Optional config object, forwarded from KitDataGridCustomRenderers.header(Component, config).' },
    ];

    // ── KitDataGridFooterRenderer interface ──────────────────────────────────
    footerRendererInterfaceDataset = [
        { property: 'result', type: 'KitDataGridResult<T>', default: '—', description: 'Latest result from the data source (rows and total count).' },
        { property: 'query', type: 'KitDataGridQuery', default: '—', description: 'Current query state.' },
        { property: 'onQueryChange', type: '(query: KitDataGridQuery) => void', default: '—', description: 'Callback to emit a new query and refresh the grid.' },
        { property: 'config', type: 'TConfig | undefined', default: 'undefined', description: 'Optional config object, forwarded from KitDataGridCustomRenderers.footer(Component, config).' },
    ];

    // ── Styling variables ─────────────────────────────────────────────────
    stylingDataset = [
        { variable: '--kit-data-grid-background-color', default: '#ffffff', description: 'Outer grid background.' },
        { variable: '--kit-data-grid-border-width', default: '1px', description: 'Outer border width.' },
        { variable: '--kit-data-grid-border-color', default: '#eaeaea', description: 'Outer border color.' },
        { variable: '--kit-data-grid-border-radius', default: '8px', description: 'Outer border radius.' },
        { variable: '--kit-data-grid-header-background-color', default: '#ffffff', description: 'Header row background.' },
        { variable: '--kit-data-grid-header-border-width', default: '1px', description: 'Border below the header row.' },
        { variable: '--kit-data-grid-header-border-color', default: '#eaeaea', description: 'Color of the border below the header row.' },
        { variable: '--kit-data-grid-header-padding-x', default: '20px', description: 'Horizontal padding inside header cells.' },
        { variable: '--kit-data-grid-row-background-color', default: '#ffffff', description: 'Default data row background.' },
        { variable: '--kit-data-grid-row-hover-background-color', default: '#f0f4fa', description: 'Row background on hover.' },
        { variable: '--kit-data-grid-row-border-width', default: '1px', description: 'Border below each row.' },
        { variable: '--kit-data-grid-row-border-color', default: '#eaeaea', description: 'Row border color.' },
        { variable: '--kit-data-grid-cell-padding-y', default: '0.75rem', description: 'Vertical padding inside data cells.' },
        { variable: '--kit-data-grid-cell-padding-x', default: '1.25rem', description: 'Horizontal padding inside data cells.' },
        { variable: '--kit-data-grid-empty-color', default: '#999', description: 'Text color of the empty-state message.' },
    ];

    ngOnInit(): void {
        const users = sampleData.users as DemoUser[];
        this.dataSource = new KitDataGridDataSources.KitDataGridInMemoryDataSource<DemoUser>(users);
        this.autoDataSource = new KitDataGridDataSources.KitDataGridInMemoryDataSource<DemoUser>(users.slice(0, 5));
        this.fixedDataSource = new KitDataGridDataSources.KitDataGridInMemoryDataSource<DemoUser>(users);
        this.customDataSource = new KitDataGridDataSources.KitDataGridInMemoryDataSource<DemoUser>(users);
    }
}
