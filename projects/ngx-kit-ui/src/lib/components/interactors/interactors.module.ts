import { NgModule } from '@angular/core';
import { KitGestureDetectorComponent } from './gesture-detector/gesture-detector.component';

@NgModule({
    imports: [
        KitGestureDetectorComponent
    ],
    exports: [
        KitGestureDetectorComponent
    ]
})
export class KitInteractorsModule { }