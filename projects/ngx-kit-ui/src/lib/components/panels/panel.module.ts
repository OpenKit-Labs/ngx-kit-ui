
import { NgModule } from '@angular/core';
import { KitCardComponent } from './card/card.component';
import { KitBadgeComponent } from './badge/badge.component';

@NgModule({
  declarations: [],
  imports: [
    KitCardComponent,
    KitBadgeComponent
  ],
  exports: [
    KitBadgeComponent,
    KitCardComponent
  ]
})
export class KitPanelModule { }
