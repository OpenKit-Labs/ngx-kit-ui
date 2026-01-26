import { NgModule } from '@angular/core';
import { SimpleTableComponent } from './simple-table/simple-table.component';
import { KitProgressBarComponent } from './progress-bar/progress-bar.component';
import { KitDataGridComponent } from './grid/grid.component';
import { KitDataGridCellRendererRegistry } from './grid/services/cells/cell-renderer-registry.service';
import { KitDataGridHeaderRendererRegistry } from './grid/services/headers/header-renderer-registry.service';
import { TextCellRendererComponent } from './grid/renderers/cells/text-cell-renderer.component';
import { TextHeaderRendererComponent } from './grid/renderers/headers/text-header-renderer.component';
import { KitDataGridCellHostDirective } from './grid/directives/cells/grid-cell-host.directive';
import { KitDataGridHeaderHostDirective } from './grid/directives/headers/grid-header-host.directive';
import { ButtonCellRendererComponent } from './grid/renderers/cells/button-cell-renderer.component';

@NgModule({
    imports: [
        SimpleTableComponent,
        KitProgressBarComponent,
        KitDataGridComponent,
        KitDataGridCellHostDirective,
        KitDataGridHeaderHostDirective,
        TextCellRendererComponent,
        TextHeaderRendererComponent
    ],
    exports: [
        SimpleTableComponent,
        KitProgressBarComponent,
        KitDataGridComponent,
        // KitDataGridCellHostDirective,
        // KitDataGridHeaderHostDirective,
        // TextCellRendererComponent,
        // TextHeaderRendererComponent
    ],
    providers: [KitDataGridCellRendererRegistry, KitDataGridHeaderRendererRegistry]
})
export class KitDataModule {
    constructor(cellRegistry: KitDataGridCellRendererRegistry, headerRegistry: KitDataGridHeaderRendererRegistry) {
        cellRegistry.register('text', TextCellRendererComponent);
        cellRegistry.register('button', ButtonCellRendererComponent);
        headerRegistry.register('text', TextHeaderRendererComponent);
    }
}