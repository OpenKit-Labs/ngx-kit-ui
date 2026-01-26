import { Component } from '@angular/core';
import { CodeBlockComponent } from '../../../../shared/code-block/code-block.component';

import {
    KitLayoutModule,
    KitTextModule,
    KitDataGridComponent,
    KitDataGridColumn,
    KitDataModule,
    SimpleTableComponent
} from '../../../../../../../ngx-kit-ui/src/public-api';

import { GridStyleConfig } from '../../../../../../../ngx-kit-ui/src/lib/components/data/grid/grid-style-config.model';

@Component({
    selector: 'app-grid-demo',
    templateUrl: './grid-demo.component.html',
    styleUrls: ['./grid-demo.component.scss'],
    standalone: true,
    imports: [
        KitLayoutModule,
        CodeBlockComponent,
        KitTextModule,
        KitDataModule,
        KitDataGridComponent,
        SimpleTableComponent
    ],
})
export class GridDemoComponent {
    importModule = `import { KitDataModule } from '@openkit-labs/ngx-kit-ui';`;
    importComponent = `import { GridComponent, GridColumn } from '@openkit-labs/ngx-kit-ui';`;
    usage = `<kit-grid [data]="gridData" [columns]="gridColumns"></kit-grid>`;

    styleConfigExample = `const styleConfig: GridStyleConfig = {
    rowHeight: '56px',
    headerBackground: 'var(--kit-color-primary)',
    borderColor: 'rgba(0,0,0,0.06)'
};

<kit-data-grid [data]="gridData" 
                             [columns]="gridColumns"
                             [styleConfig]="styleConfig"></kit-data-grid>`;

    inputsDefinition = [
        { title: 'Input', lookupField: 'input' },
        { title: 'Type', lookupField: 'type' },
        { title: 'Default', lookupField: 'default' },
        { title: 'Description', lookupField: 'description' }
    ];
    inputsDataset = [
        { input: 'data', type: 'any[]', default: "[]", description: 'The data array to be displayed in the grid.' },
        { input: 'columns', type: 'GridColumn[]', default: "[]", description: 'The column definitions for the grid.' },
        { input: 'styleConfig', type: 'GridStyleConfig', default: "undefined", description: 'Optional per-grid styling configuration. Falls back to theme defaults when undefined.' },
    ];

    configPropertiesDefinition = [
        { title: 'Property', lookupField: 'property' },
        { title: 'Type', lookupField: 'type' },
        { title: 'Default', lookupField: 'default' },
        { title: 'Description', lookupField: 'description' }
    ];
    configPropertiesDataset = [
        { property: 'rowHeight', type: 'string | number', default: '48px', description: 'Row height in pixels or CSS units.' },
        { property: 'headerBackground', type: 'string', default: 'theme var', description: 'Header background color.' },
        { property: 'borderColor', type: 'string', default: 'theme var', description: 'Border color between cells.' },
        { property: 'rowBackground', type: 'string', default: 'theme var', description: 'Row background color.' },
        { property: 'rowHoverBackground', type: 'string', default: 'theme var', description: 'Row background on hover.' },
    ];

    stylingDefinition = [
        { title: 'Variable', lookupField: 'variable' },
        { title: 'Default', lookupField: 'default' },
        { title: 'Description', lookupField: 'description' }
    ];
    stylingDataset = [
        { variable: '--kit-data-grid-header-background', default: 'var(--kit-table-header-background-color)', description: 'Background color of the table header.' },
        { variable: '--kit-data-grid-border-color', default: 'var(--kit-table-row-border-color)', description: 'Border color for grid cells.' },
        { variable: '--kit-data-grid-cell-padding-x', default: 'var(--kit-table-cell-padding)', description: 'Horizontal cell padding.' },
        { variable: '--kit-data-grid-cell-padding-y', default: 'var(--kit-table-cell-padding)', description: 'Vertical cell padding.' },
    ];

    // Demo: default grid (uses all theme defaults)
    gridColumns: KitDataGridColumn[] = [
        { header: 'Name', field: 'name', type: 'text' },
        { header: 'Email', field: 'email', type: 'text' },
        { header: 'Status', field: 'status', type: 'text', maxWidth: '120px', minWidth: '120px' },
        { header: 'Nickname', field: 'nickname', type: 'text' },
        { header: 'Phone', field: 'phone', type: 'text' },
        { header: 'Address', field: 'address', type: 'text', width: '500px', minWidth: '500px' },
    ];

    gridData = [
        { name: 'Alice Johnson', email: 'alice@example.comenhieriskakbaiedatainhierdieveld', status: 'Active', nickname: 'Ally', phone: '555-1234', address: '123 Main St' },
        { name: 'Bob Smith', email: 'bob@example.com hier is ook kak baie data, maar die een het redelik spasies en dinge vir homself', status: 'Active', nickname: 'Bobby', phone: '555-5678', address: '456 Oak Ave' },
        { name: 'Carol White', email: 'carol@example.com', status: 'Inactive', nickname: 'Carrie', phone: '555-8765', address: '789 Pine Rd' },
        { name: 'David Brown', email: 'david@example.com', status: 'Active', nickname: 'Dave', phone: '555-4321', address: '321 Elm St' },
    ];

    // Demo: styled grid with galaxy-themed config
    styledConfig: GridStyleConfig = {
        /* ============================================================
         * GRID CANVAS — EXTREME STAR FIELD + NEBULAE
         * ============================================================ */
        gridBackground: `
        /* large galactic light wells */
        radial-gradient(1400px 800px at 10% 15%, rgba(190, 110, 255, 0.22), transparent 70%),
        radial-gradient(1200px 700px at 90% 85%, rgba(0, 200, 255, 0.18), transparent 68%),
        radial-gradient(900px 600px at 50% 50%, rgba(120, 80, 255, 0.14), transparent 72%),

        /* dense star clusters */
        radial-gradient(1px 1px at 8% 12%, rgba(255,255,255,0.9), transparent 60%),
        radial-gradient(1.5px 1.5px at 18% 65%, rgba(255,255,255,0.8), transparent 60%),
        radial-gradient(1px 1px at 32% 28%, rgba(255,255,255,0.7), transparent 60%),
        radial-gradient(2px 2px at 46% 78%, rgba(255,255,255,0.85), transparent 60%),
        radial-gradient(1.2px 1.2px at 60% 22%, rgba(255,255,255,0.75), transparent 60%),
        radial-gradient(1px 1px at 72% 55%, rgba(255,255,255,0.65), transparent 60%),
        radial-gradient(1.8px 1.8px at 86% 18%, rgba(255,255,255,0.9), transparent 60%),
        radial-gradient(1px 1px at 92% 72%, rgba(255,255,255,0.7), transparent 60%),

        /* deep space void */
        linear-gradient(180deg, #02030a 0%, #040615 100%)
    `,

        // rowHeight: '20px',
        rowMinHeight: '99px',
        rowMaxHeight: '99px',

        /* ============================================================
         * ROW BASE — HEAVY STARS + NEBULA CLOUDS + DUST LANES
         * ============================================================ */
        rowBackground: 'transparent',
        rowBackgroundImage: `
        /* micro stars — high density */
        radial-gradient(1px 1px at 6% 40%, rgba(255,255,255,0.8), transparent 60%),
        radial-gradient(1.3px 1.3px at 14% 65%, rgba(255,255,255,0.75), transparent 60%),
        radial-gradient(1px 1px at 22% 30%, rgba(255,255,255,0.7), transparent 60%),
        radial-gradient(1.5px 1.5px at 30% 55%, rgba(255,255,255,0.85), transparent 60%),
        radial-gradient(1px 1px at 38% 75%, rgba(255,255,255,0.6), transparent 60%),
        radial-gradient(1.4px 1.4px at 46% 35%, rgba(255,255,255,0.8), transparent 60%),
        radial-gradient(1px 1px at 54% 60%, rgba(255,255,255,0.7), transparent 60%),
        radial-gradient(1.6px 1.6px at 62% 28%, rgba(255,255,255,0.9), transparent 60%),
        radial-gradient(1px 1px at 70% 50%, rgba(255,255,255,0.65), transparent 60%),
        radial-gradient(1.3px 1.3px at 78% 72%, rgba(255,255,255,0.75), transparent 60%),
        radial-gradient(1px 1px at 86% 42%, rgba(255,255,255,0.7), transparent 60%),
        radial-gradient(1.5px 1.5px at 94% 65%, rgba(255,255,255,0.85), transparent 60%),

        /* nebula clouds */
        radial-gradient(600px 140px at 20% 50%, rgba(160, 90, 255, 0.18), transparent 75%),
        radial-gradient(500px 120px at 70% 45%, rgba(0, 180, 255, 0.16), transparent 75%),
        radial-gradient(400px 100px at 50% 55%, rgba(255, 120, 200, 0.14), transparent 75%),

        /* milky way dust lane */
        linear-gradient(115deg,
            rgba(10, 15, 45, 0.9) 0%,
            rgba(70, 50, 140, 0.65) 35%,
            rgba(40, 110, 170, 0.6) 55%,
            rgba(10, 15, 45, 0.9) 100%
        )
    `,

        /* ============================================================
         * ALTERNATE ROWS — EVEN DENSER STAR VARIANCE
         * ============================================================ */
        rowAlternateBackground: 'transparent',
        rowAlternateBackgroundImage: `
        radial-gradient(1px 1px at 10% 30%, rgba(255,255,255,0.75), transparent 60%),
        radial-gradient(1.5px 1.5px at 18% 60%, rgba(255,255,255,0.85), transparent 60%),
        radial-gradient(1px 1px at 26% 45%, rgba(255,255,255,0.7), transparent 60%),
        radial-gradient(1.3px 1.3px at 34% 70%, rgba(255,255,255,0.8), transparent 60%),
        radial-gradient(1px 1px at 42% 35%, rgba(255,255,255,0.65), transparent 60%),
        radial-gradient(1.6px 1.6px at 50% 55%, rgba(255,255,255,0.9), transparent 60%),
        radial-gradient(1px 1px at 58% 75%, rgba(255,255,255,0.7), transparent 60%),
        radial-gradient(1.4px 1.4px at 66% 40%, rgba(255,255,255,0.8), transparent 60%),
        radial-gradient(1px 1px at 74% 60%, rgba(255,255,255,0.65), transparent 60%),
        radial-gradient(1.5px 1.5px at 82% 30%, rgba(255,255,255,0.85), transparent 60%),
        radial-gradient(1px 1px at 90% 50%, rgba(255,255,255,0.7), transparent 60%),

        radial-gradient(700px 160px at 50% 50%, rgba(120, 80, 255, 0.18), transparent 78%),

        linear-gradient(115deg,
            rgba(6, 10, 35, 0.95) 0%,
            rgba(40, 35, 90, 0.7) 40%,
            rgba(70, 40, 120, 0.6) 70%,
            rgba(6, 10, 35, 0.95) 100%
        )
    `,

        /* ============================================================
         * INTERACTION — KEEP IT SIMPLE
         * ============================================================ */
        rowHoverBackground: 'transparent',
        rowHoverBackgroundImage: `
        linear-gradient(90deg,
            rgba(120, 80, 255, 0.6) 0%,
            rgba(0, 200, 255, 0.6) 50%,
            rgba(120, 80, 255, 0.6) 100%
        )
    `,

        rowSelectedBackground: 'transparent',
        rowSelectedBackgroundImage: `
        linear-gradient(90deg,
            rgba(255, 120, 200, 0.7) 0%,
            rgba(140, 80, 255, 0.75) 50%,
            rgba(255, 120, 200, 0.7) 100%
        )
    `,

        /* ============================================================
         * HEADER — SPACE DENSE BUT ORDERLY
         * ============================================================ */
        headerBackground: 'transparent',
        headerBackgroundImage: `
        radial-gradient(1.5px 1.5px at 20% 35%, rgba(255,255,255,0.85), transparent 60%),
        radial-gradient(1px 1px at 45% 55%, rgba(255,255,255,0.7), transparent 60%),
        radial-gradient(2px 2px at 75% 40%, rgba(255,255,255,0.9), transparent 60%),

        linear-gradient(180deg,
            rgba(8, 10, 40, 0.95) 0%,
            rgba(40, 30, 100, 0.9) 50%,
            rgba(15, 40, 120, 0.95) 100%
        )
    `,

        headerPaddingY: '1rem',
        headerPaddingX: '1.5rem',
        cellPaddingY: '0.875rem',
        cellPaddingX: '1.5rem',

        /* ============================================================
         * STRUCTURE
         * ============================================================ */
        gridBorderColor: 'rgba(140, 160, 255, 0.22)',
        gridBorderWidth: '1px',
        gridBorderRadius: '18px',

        gridShadow: `
        0 50px 140px rgba(60, 80, 255, 0.4),
        0 0 120px rgba(140, 100, 255, 0.35),
        inset 0 1px 0 rgba(255,255,255,0.12)
    `,
        columnMaxWidth: '220px',
        columnMinWidth: '220px',
    };




    // Demo: compact grid
    // Note: demo uses a single default `styledConfig` bound to the grid.
}
