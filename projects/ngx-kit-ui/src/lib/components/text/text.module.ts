import { NgModule } from '@angular/core';

import { KitTextHeadingComponent } from './text-heading/text-heading.component';
import { KitTextSubheadingComponent } from './text-subheading/text-subheading.component';
import { KitTextDisplayComponent } from './text-display/text-display.component';
import { KitTextLabelComponent } from './text-label/text-label.component';
import { KitTextBodyComponent } from './text-body/text-body.component';
import { KitTextCaptionComponent } from './text-caption/text-caption.component';
import { KitTextLinkComponent } from './text-link/text-link.component';

@NgModule({
  declarations: [],
  imports: [
    KitTextHeadingComponent,
    KitTextSubheadingComponent,
    KitTextDisplayComponent,
    KitTextLabelComponent,
    KitTextBodyComponent,
    KitTextCaptionComponent,
    KitTextLinkComponent,
  ],
  exports: [
    KitTextHeadingComponent,
    KitTextSubheadingComponent,
    KitTextDisplayComponent,
    KitTextLabelComponent,
    KitTextBodyComponent,
    KitTextCaptionComponent,
    KitTextLinkComponent,
  ]
})
export class KitTextModule { }