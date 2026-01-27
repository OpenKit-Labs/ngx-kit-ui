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
        { header: 'Address', field: 'address', type: 'text', width: '500px', minWidth: '500px' }
    ];

    gridData = [
        { name: 'Alice Johnson', email: 'alice@example.comenhieriskakbaiedatainhierdieveld', status: 'Active', nickname: 'Ally', phone: '555-1234', address: '123 Main St' },
        { name: 'Bob Smith', email: 'bob@example.com hier is ook kak baie data, maar die een het redelik spasies en dinge vir homself', status: 'Active', nickname: 'Bobby', phone: '555-5678', address: '456 Oak Ave' },
        { name: 'Carol White', email: 'carol@example.com', status: 'Inactive', nickname: 'Carrie', phone: '555-8765', address: '789 Pine Rd' },
        { name: 'David Brown', email: 'david@example.com', status: 'Active', nickname: 'Dave', phone: '555-4321', address: '321 Elm St' },
        { name: 'Eva Green', email: 'eva@example.com', status: 'Inactive', nickname: 'Evie', phone: '555-6789', address: '654 Maple Ln' },
        { name: 'Frank Black', email: 'frank@example.com', status: 'Active', nickname: 'Frankie', phone: '555-9876', address: '987 Cedar Blvd' },
        { name: 'Grace Miller', email: 'grace@example.com', status: 'Active', nickname: 'Gracie', phone: '555-1111', address: '111 Birch St' },
        { name: 'Henry Ford', email: 'henry@example.com_this_is_a_very_long_string_to_test_how_the_grid_cell_handles_overflow_without_spaces', status: 'Inactive', nickname: 'Hank', phone: '555-2222', address: '222 Walnut Dr' },
        { name: 'Isabella Ross', email: 'isabella@example.com', status: 'Active', nickname: 'Izzy', phone: '555-3333', address: '333 Cherry Ln' },
        { name: 'Jack Daniels', email: 'jack@example.com', status: 'Active', nickname: 'JD', phone: '555-4444', address: '444 Whiskey Way' },
        { name: 'Kelly Clarkson', email: 'kelly@example.com', status: 'Inactive', nickname: 'Kel', phone: '555-5555', address: '555 Pop Ave' },
        { name: 'Liam Neeson', email: 'liam@example.com_i_will_find_you_and_i_will_test_your_css_layout', status: 'Active', nickname: 'Bryan', phone: '555-6666', address: '666 Taken St' },
        { name: 'Mona Lisa', email: 'mona@example.com', status: 'Active', nickname: 'Mo', phone: '555-7777', address: '777 Louvre Mus' },
        { name: 'Noah Ark', email: 'noah@example.com', status: 'Inactive', nickname: 'Captain', phone: '555-8888', address: '888 Flood Rd' },
        { name: 'Olivia Pope', email: 'olivia@example.com', status: 'Active', nickname: 'Liv', phone: '555-9999', address: '999 DC Blvd' },
        { name: 'Peter Parker', email: 'peter@example.com_with_great_data_comes_great_responsibility_and_overflow', status: 'Active', nickname: 'Spidey', phone: '555-0000', address: '10 Queens Blvd' },
        { name: 'Quinn Fabray', email: 'quinn@example.com', status: 'Inactive', nickname: 'Q', phone: '555-1212', address: '121 High School Dr' },
        { name: 'Riley Reid', email: 'riley@example.com', status: 'Active', nickname: 'Riles', phone: '555-2323', address: '232 Hollywood Blvd' },
        { name: 'Steve Rogers', email: 'steve@example.com_i_can_do_this_all_day_long_until_the_grid_breaks', status: 'Active', nickname: 'Cap', phone: '555-3434', address: '343 Brooklyn St' },
        { name: 'Tony Stark', email: 'tony@example.com', status: 'Active', nickname: 'IronMan', phone: '555-4545', address: '454 Malibu Dr' },
        { name: 'Ursula Sea', email: 'ursula@example.com', status: 'Inactive', nickname: 'Witch', phone: '555-5656', address: '565 Ocean Floor' },
        { name: 'Victor Von Doom', email: 'victor@example.com_latveria_ruler_of_this_grid_and_all_it_surveys', status: 'Active', nickname: 'Doom', phone: '555-6767', address: '676 Castle Dr' },
        { name: 'Wanda Maximoff', email: 'wanda@example.com', status: 'Active', nickname: 'Scarlet', phone: '555-7878', address: '788 Vision Ln' },
        { name: 'Xavier Charles', email: 'xavier@example.com', status: 'Inactive', nickname: 'Prof X', phone: '555-8989', address: '898 Mutant Way' },
        { name: 'Yolanda BeCool', email: 'yolanda@example.com', status: 'Active', nickname: 'Yo', phone: '555-9090', address: '909 Disco Ave' },
        { name: 'Zack Morris', email: 'zack@example.com', status: 'Active', nickname: 'Preppy', phone: '555-0101', address: '101 Bayside High' },
        { name: 'Adam Sandler', email: 'adam@example.com_waterboy_billy_madison_happy_gilmore_long_text', status: 'Inactive', nickname: 'Sandman', phone: '555-1122', address: '112 Comedy Dr' },
        { name: 'Barry Allen', email: 'barry@example.com', status: 'Active', nickname: 'Flash', phone: '555-3344', address: '334 Speed Force' },
        { name: 'Clark Kent', email: 'clark@example.com_look_up_in_the_sky_its_a_bird_its_a_plane_its_data', status: 'Active', nickname: 'Supes', phone: '555-5566', address: '556 Metropolis Ave' },
        { name: 'Diana Prince', email: 'diana@example.com', status: 'Active', nickname: 'Wondy', phone: '555-7788', address: '778 Paradise Isle' }
    ];


    // Demo: styled grid with galaxy-themed config
    styledConfig: GridStyleConfig = {
        /* ============================================================
         * GRID CANVAS — EXTREME STAR FIELD + NEBULAE
         * ============================================================ */
        gridBackgroundImage: `
        radial-gradient(1.5px 1.5px at 20% 35%, rgba(255,255,255,0.85), transparent 60%),
        radial-gradient(1px 1px at 45% 55%, rgba(255,255,255,0.7), transparent 60%),
        radial-gradient(2px 2px at 75% 40%, rgba(255,255,255,0.9), transparent 60%),

        linear-gradient(180deg,
            rgba(8, 10, 40, 0.95) 0%,
            rgba(40, 30, 100, 0.9) 50%,
            rgba(15, 40, 120, 0.95) 100%
        )`,
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
        columnMaxWidth: '220px',
        columnMinWidth: '220px',
    };




    onGridCellEvent(event: any) {
        console.log('Cell event received in demo component:', event);
    }
}
