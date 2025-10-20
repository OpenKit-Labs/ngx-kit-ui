import { NgModule } from '@angular/core';
import { KitFileSizePipe } from './file-size/file-size.pipe';
import { KitTimeAgoPipe } from './time-ago/time-ago.pipe';
import { KitKMBPipe } from './kmb/kmb.pipe';

@NgModule({
  imports: [
    KitFileSizePipe,
    KitTimeAgoPipe,
    KitKMBPipe
  ],
  exports: [
    KitFileSizePipe,
    KitTimeAgoPipe,
    KitKMBPipe
  ]
})
export class KitPipesModule { }
