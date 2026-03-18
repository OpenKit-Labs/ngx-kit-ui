import { NgModule } from '@angular/core';
import { KitDialogComponent } from './dialog/dialog.component';
import { KitBottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { KitPopoverComponent } from './popover/popover.component';


@NgModule({
    imports: [
        KitBottomSheetComponent,
        KitDialogComponent,
        KitPopoverComponent,
    ],
    exports: [
        KitBottomSheetComponent,
        KitDialogComponent,
        KitPopoverComponent,
    ]
})
export class KitOverlaysModule { }
