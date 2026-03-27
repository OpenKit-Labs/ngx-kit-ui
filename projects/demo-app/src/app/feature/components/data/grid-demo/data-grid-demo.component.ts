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
    dataSource!: KitGridDataSource<DemoUser>;
    autoDataSource!: KitGridDataSource<DemoUser>;
    fixedDataSource!: KitGridDataSource<DemoUser>;
    customDataSource!: KitGridDataSource<DemoUser>;

    // ── Configs ───────────────────────────────────────────────────────────────
    viewportConfig: KitGridConfig = {
        row: { minHeight: 48, maxHeight: 69 },
        footer: KitGridBuiltinFooterRenderers.Default({ showPageInfo: true }),
        height: 'viewport',
    };

    autoConfig: KitGridConfig = {
        row: { height: 48 },
        footer: KitGridBuiltinFooterRenderers.Default({ showPageInfo: true }),
        height: 'auto',
    };

    fixedConfig: KitGridConfig = {
        row: { height: 48 },
        footer: KitGridBuiltinFooterRenderers.Default({ showPageInfo: true }),
        height: 400,
    };

    noFooterConfig: KitGridConfig = {
        row: { height: 48 },
        showFooter: false,
        height: 'auto',
    };

    // ── Column sets ───────────────────────────────────────────────────────────
    basicColumns: KitGridColumn<DemoUser>[] = [
        { field: 'full_name', title: 'Name' },
        { field: 'email', title: 'Email' },
        { field: 'status', title: 'Status' },
        { field: 'location.city', title: 'City' },
        { field: 'location.country', title: 'Country' },
    ];

    viewportColumns: KitGridColumn<DemoUser>[] = [
        { field: 'full_name', title: 'Name', minWidth: 160 },
        { field: 'email', title: 'Email', minWidth: 220, maxWidth: 400 },
        { field: 'status', title: 'Status', absoluteWidth: 100 },
        {
            field: 'joined_date',
            title: 'Joined',
            cellRenderer: KitGridBuiltinCellRenderers.TimeAgo(),
            headerRenderer: KitGridBuiltinHeaderRenderers.Control({ sortable: true, searchable: false }),
        },
        {
            field: 'location.city',
            title: 'City',
            headerRenderer: KitGridBuiltinHeaderRenderers.Control({ sortable: true }),
        },
        { field: 'location.country', title: 'Country' },
    ];

    customColumns: KitGridColumn<DemoUser>[] = [
        { field: 'full_name', title: 'Name' },
        { field: 'status', title: 'Status' },
        { field: 'tags', title: 'Tags', cellRenderer: kitCellRenderer(CustomButtonCellComponent, { color: 'primary' }) },
    ];

    // ── Usage code snippets ───────────────────────────────────────────────────
    importModule = `import { KitDataGridModule } from '@openkit-labs/ngx-kit-ui';`;
    importComponent = `import { KitDataGridComponent } from '@openkit-labs/ngx-kit-ui';`;
    importDataSource = `import { KitGridInMemoryDataSource } from '@openkit-labs/ngx-kit-ui';`;

    usageBasic = `<kit-data-grid
  [dataSource]="dataSource"
  [columns]="columns">
</kit-data-grid>`;

    usageWithConfig = `<kit-data-grid
  [dataSource]="dataSource"
  [columns]="columns"
  [config]="config">
</kit-data-grid>`;

    usageDataSource = `interface User {
  id: number;
  name: string;
  email: string;
}

// In your component:
dataSource = new KitGridInMemoryDataSource<User>(users);`;

    usageCustomColumnDefs = `columns: KitGridColumn<User>[] = [
  { field: 'name',  title: 'Full Name', minWidth: 160 },
  { field: 'email', title: 'Email',     minWidth: 220, maxWidth: 400 },
  { field: 'role',  title: 'Role',      absoluteWidth: 120 },
];`;

    usageBuiltinRenderers = `import {
  KitGridBuiltinCellRenderers,
  KitGridBuiltinHeaderRenderers,
  KitGridBuiltinFooterRenderers,
} from '@openkit-labs/ngx-kit-ui';

columns: KitGridColumn<User>[] = [
  {
    field: 'created_at',
    title: 'Created',
    cellRenderer:   KitGridBuiltinCellRenderers.TimeAgo(),
    headerRenderer: KitGridBuiltinHeaderRenderers.Control({ sortable: true, searchable: false }),
  },
];

config: KitGridConfig = {
  footer: KitGridBuiltinFooterRenderers.Default({ showPageInfo: true }),
};`;

    usageCustomRenderer = `// 1. Implement the KitGridCellRenderer interface
@Component({
  selector: 'app-status-cell',
  template: \`<span [class]="'badge badge-' + value">{{ value }}</span>\`,
  standalone: true,
})
export class StatusCellComponent implements KitGridCellRenderer<string, void> {
  @Input() value!: string;
  @Input() config?: void;
}

// 2. Reference it with kitCellRenderer()
import { kitCellRenderer } from '@openkit-labs/ngx-kit-ui';

columns: KitGridColumn<User>[] = [
  {
    field: 'status',
    title: 'Status',
    cellRenderer: kitCellRenderer(StatusCellComponent),
  },
];`;

    usageCustomRendererWithConfig = `// Config-aware custom cell renderer
export interface BadgeCellConfig {
  color: 'primary' | 'danger' | 'success';
}

@Component({
  selector: 'app-badge-cell',
  template: \`<kit-button [color]="config?.color ?? 'primary'">{{ value }}</kit-button>\`,
  standalone: true,
  imports: [KitButtonModule],
})
export class BadgeCellComponent implements KitGridCellRenderer<string, BadgeCellConfig> {
  @Input() value!: string;
  @Input() config?: BadgeCellConfig;
}

// Pass config as second argument
cellRenderer: kitCellRenderer(BadgeCellComponent, { color: 'danger' })`;

    usageHeightModes = `// Fill the remaining vertical space of the flex parent (default)
config: KitGridConfig = { height: 'flex' };

// Fill from the grid's top edge to the bottom of the viewport
config: KitGridConfig = { height: 'viewport' };

// Shrink-wrap the grid to its content (no scrolling)
config: KitGridConfig = { height: 'auto' };

// Fixed pixel height
config: KitGridConfig = { height: 400 };`;

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
        { input: 'dataSource', type: 'KitGridDataSource<T>', description: 'The data source that provides and filters rows.' },
        { input: 'columns', type: 'KitGridColumn<T>[]', description: 'Column definitions array.' },
        { input: 'columnDefaults', type: 'Partial<KitGridColumn<T>>', description: 'Default values applied to every column unless overridden.' },
        { input: 'config', type: 'KitGridConfig', description: 'Grid-level configuration (height, row sizing, footer).' },
    ];

    // ── KitGridColumn props ────────────────────────────────────────────────
    columnPropsDataset = [
        { property: 'field', type: 'keyof T | string', default: '—', description: 'Dot-notation path to the data property (e.g. "location.city").' },
        { property: 'title', type: 'string', default: '—', description: 'Column header label.' },
        { property: 'absoluteWidth', type: 'number', default: 'undefined', description: 'Fixed pixel width. Overrides minWidth / maxWidth.' },
        { property: 'minWidth', type: 'number', default: 'undefined', description: 'Minimum column width in pixels. Column stretches up to maxWidth or fills remaining space.' },
        { property: 'maxWidth', type: 'number', default: 'undefined', description: 'Hard pixel cap. Column always reaches this width; use minWidth alone for flexible sizing.' },
        { property: 'cellRenderer', type: 'KitGridCellRendererDescriptor', default: 'Default renderer', description: 'Descriptor for a custom or built-in cell renderer component.' },
        { property: 'headerRenderer', type: 'KitGridHeaderRendererDescriptor', default: 'Default renderer', description: 'Descriptor for a custom or built-in header renderer component.' },
    ];

    // ── KitGridConfig ──────────────────────────────────────────────────────
    configPropsDataset = [
        { property: 'height', type: "KitGridHeight", default: "'flex'", description: "Controls how the grid fills vertical space. See Height Modes." },
        { property: 'showFooter', type: 'boolean', default: 'true', description: 'Whether to render the footer row.' },
        { property: 'footer', type: 'KitGridFooterRendererDescriptor', default: 'Default footer', description: 'Descriptor for the footer renderer.' },
        { property: 'row', type: 'KitGridRowConfig', default: 'undefined', description: 'Per-row height constraints.' },
    ];

    // ── KitGridRowConfig ──────────────────────────────────────────────────
    rowConfigDataset = [
        { property: 'height', type: 'number', default: 'undefined', description: 'Fixed row height in pixels.' },
        { property: 'minHeight', type: 'number', default: 'undefined', description: 'Minimum row height in pixels.' },
        { property: 'maxHeight', type: 'number', default: 'undefined', description: 'Maximum row height in pixels.' },
    ];

    // ── KitGridHeight ─────────────────────────────────────────────────────
    heightModesDataset = [
        { property: "'flex'", type: 'string', default: '✓', description: 'Stretches the grid to fill the remaining height of its flex parent.' },
        { property: "'viewport'", type: 'string', default: '', description: 'Calculates the remaining viewport height from the grid\'s top edge.' },
        { property: "'auto'", type: 'string', default: '', description: 'Shrink-wraps to content. No internal scroll.' },
        { property: 'number', type: 'number', default: '', description: 'Sets an explicit pixel height.' },
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

    // ── KitGridCellRenderer interface ─────────────────────────────────────
    cellRendererInterfaceDataset = [
        { property: 'value', type: 'TValue', default: '—', description: 'The resolved cell value passed from the column\'s field path.' },
        { property: 'config', type: 'TConfig | undefined', default: 'undefined', description: 'Optional config object forwarded from kitCellRenderer(Component, config).' },
    ];

    // ── KitGridHeaderRenderer interface ──────────────────────────────────
    headerRendererInterfaceDataset = [
        { property: 'title', type: 'string', default: '—', description: 'Column title from the column definition.' },
        { property: 'field', type: 'string', default: '—', description: 'Column field key.' },
        { property: 'query', type: 'KitGridQuery', default: '—', description: 'Current query snapshot (page, sort, filters).' },
        { property: 'onQueryChange', type: '(query: KitGridQuery) => void', default: '—', description: 'Callback to emit a new query (triggers a data-source refresh).' },
        { property: 'config', type: 'TConfig | undefined', default: 'undefined', description: 'Optional config object forwarded from kitHeaderRenderer(Component, config).' },
    ];

    // ── KitGridFooterRenderer interface ──────────────────────────────────
    footerRendererInterfaceDataset = [
        { property: 'result', type: 'KitGridResult<T>', default: '—', description: 'Latest result from the data source (data array + total count).' },
        { property: 'query', type: 'KitGridQuery', default: '—', description: 'Current query snapshot.' },
        { property: 'onQueryChange', type: '(query: KitGridQuery) => void', default: '—', description: 'Callback to emit a new query.' },
        { property: 'config', type: 'TConfig | undefined', default: 'undefined', description: 'Optional config forwarded from kitFooterRenderer(Component, config).' },
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
        this.dataSource = new KitGridInMemoryDataSource<DemoUser>(users);
        this.autoDataSource = new KitGridInMemoryDataSource<DemoUser>(users.slice(0, 5));
        this.fixedDataSource = new KitGridInMemoryDataSource<DemoUser>(users);
        this.customDataSource = new KitGridInMemoryDataSource<DemoUser>(users);
    }
}
