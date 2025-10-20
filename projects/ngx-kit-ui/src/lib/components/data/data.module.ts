import { NgModule } from '@angular/core';
import { SimpleTableComponent } from './simple-table/simple-table.component';
import { KitProgressBarComponent } from './progress-bar/progress-bar.component';
import { KitCarouselComponent } from './carousel/carousel.component';

@NgModule({
    imports: [
        SimpleTableComponent,
        KitProgressBarComponent,
        KitCarouselComponent
    ],
    exports: [
        SimpleTableComponent,
        KitProgressBarComponent,
        KitCarouselComponent
    ]
})
export class KitDataModule { }