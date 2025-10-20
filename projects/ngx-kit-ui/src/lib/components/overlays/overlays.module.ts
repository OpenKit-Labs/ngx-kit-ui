import { NgModule } from '@angular/core';
import { KitDialogComponent } from './dialog/dialog.component';
import { KitBottomSheetComponent } from './bottom-sheet/bottom-sheet.component';


@NgModule({
    imports: [
        KitBottomSheetComponent,
        KitDialogComponent,
    ],
    exports: [
        KitBottomSheetComponent,
        KitDialogComponent,
    ]
})
export class KitOverlaysModule { }
