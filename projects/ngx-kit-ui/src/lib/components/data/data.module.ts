import { NgModule } from '@angular/core';
import { SimpleTableComponent } from './simple-table/simple-table.component';
import { KitProgressBarComponent } from './progress-bar/progress-bar.component';

@NgModule({
    imports: [
        SimpleTableComponent,
        KitProgressBarComponent
    ],
    exports: [
        SimpleTableComponent,
        KitProgressBarComponent
    ]
})
export class KitDataModule { }