import { NgModule } from '@angular/core';
import { SimpleTableComponent } from './simple-table/simple-table.component';
import { KitProgressBarComponent } from './progress-bar/progress-bar.component';
import { KitDataGridV1Component } from './grid/grid.component';
import { KitDataGridV1CellRendererRegistry } from './grid/services/cells/cell-renderer-registry.service';
import { KitDataGridV1HeaderRendererRegistry } from './grid/services/headers/header-renderer-registry.service';
import { KitDataGridV1CellHostDirective } from './grid/directives/cells/grid-cell-host.directive';
import { KitDataGridV1HeaderHostDirective } from './grid/directives/headers/grid-header-host.directive';
import { KitDataGridV1TextHeaderRendererComponent } from './grid/renderers/headers/text/text-header-renderer.component';
import { KitDataGridV1TextCellRendererComponent } from './grid/renderers/cells/text/text-cell-renderer.component';

@NgModule({
    imports: [
        SimpleTableComponent,
        KitProgressBarComponent,
        KitDataGridV1Component,
        KitDataGridV1CellHostDirective,
        KitDataGridV1HeaderHostDirective,
        KitDataGridV1TextCellRendererComponent,
        KitDataGridV1TextHeaderRendererComponent
    ],
    exports: [
        SimpleTableComponent,
        KitProgressBarComponent,
        KitDataGridV1Component,
        KitDataGridV1CellHostDirective,
        KitDataGridV1HeaderHostDirective,
        KitDataGridV1TextCellRendererComponent,
        KitDataGridV1TextHeaderRendererComponent
    ],
    providers: [KitDataGridV1CellRendererRegistry, KitDataGridV1HeaderRendererRegistry]
})
export class KitDataModule {
    constructor(cellRegistry: KitDataGridV1CellRendererRegistry, headerRegistry: KitDataGridV1HeaderRendererRegistry) {
        //REGISTER CELLS
        cellRegistry.register('text', KitDataGridV1TextCellRendererComponent);
        //REGISTER HEADERS

        headerRegistry.register('text', KitDataGridV1TextHeaderRendererComponent);
    }
}