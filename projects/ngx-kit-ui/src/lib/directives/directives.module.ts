import { NgModule } from '@angular/core';
import { KitPressAndHoldDirective } from './press-and-hold/press-and-hold.directive';
import { KitCopyToClipboardDirective } from './copy-to-clipboard/copy-to-clipboard.directive';

@NgModule({
  imports: [
    KitPressAndHoldDirective,
    KitCopyToClipboardDirective
  ],
  exports: [
    KitPressAndHoldDirective,
    KitCopyToClipboardDirective
  ]
})
export class KitDirectivesModule { }
