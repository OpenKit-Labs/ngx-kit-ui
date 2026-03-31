import { NgModule } from '@angular/core';
import { SimpleTableComponent } from './simple-table/simple-table.component';
import { KitProgressBarComponent } from './progress-bar/progress-bar.component';

// Data Grid Component
import { KitDataGridComponent } from './data-grid/component/kit-data-grid.component';

// Data Grid Renderer Components
import { KitDataGridDefaultCellRendererComponent } from './data-grid/renderers/cell/default/kit-data-grid-default-cell-renderer.component';
import { KitDataGridTimeAgoCellRendererComponent } from './data-grid/renderers/cell/time-ago/kit-data-grid-time-ago-cell-renderer.component';
import { KitDataGridDefaultHeaderRendererComponent } from './data-grid/renderers/header/default/kit-data-grid-default-header-renderer.component';
import { KitDataGridControlHeaderRendererComponent } from './data-grid/renderers/header/control/kit-data-grid-control-header-renderer.component';
import { KitDataGridDefaultFooterRendererComponent } from './data-grid/renderers/footer/default/kit-data-grid-default-footer-renderer.component';

@NgModule({
    imports: [
        SimpleTableComponent,
        KitProgressBarComponent,
        KitDataGridComponent,
        KitDataGridDefaultCellRendererComponent,
        KitDataGridTimeAgoCellRendererComponent,
        KitDataGridDefaultHeaderRendererComponent,
        KitDataGridControlHeaderRendererComponent,
        KitDataGridDefaultFooterRendererComponent,
    ],
    exports: [
        SimpleTableComponent,
        KitProgressBarComponent,
        KitDataGridComponent,
        KitDataGridDefaultCellRendererComponent,
        KitDataGridTimeAgoCellRendererComponent,
        KitDataGridDefaultHeaderRendererComponent,
        KitDataGridControlHeaderRendererComponent,
        KitDataGridDefaultFooterRendererComponent,
    ]
})
export class KitDataModule { }