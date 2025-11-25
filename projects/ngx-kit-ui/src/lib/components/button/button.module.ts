import { NgModule } from '@angular/core';
import { KitButtonComponent } from './button/button.component';
import { KitTextButtonComponent } from './text-button/text-button.component';
import { KitRoundButtonComponent } from './round-button/round-button.component';
import { KitFloatingActionButtonComponent } from './floating-action-button/floating-action-button.component';
import { KitButtonGroupComponent } from './button-group/button-group.component';
import { KitButtonGroupItemComponent } from './button-group/button-group-item/button-group-item.component';
import { KitButtonGroupItemActiveDirective } from './button-group/button-group-item/kit-button-group-item-active.directive';
import { KitButtonGroupItemIdleDirective } from './button-group/button-group-item/kit-button-group-item-idle.directive';
import { KitRadioButtonComponent } from './radio-button/radio-button.component';

@NgModule({
  imports: [
    KitButtonComponent,
    KitTextButtonComponent,
    KitRoundButtonComponent,
    KitFloatingActionButtonComponent,
    KitButtonGroupComponent,
    KitButtonGroupItemComponent,
    KitButtonGroupItemActiveDirective,
    KitButtonGroupItemIdleDirective,
    KitRadioButtonComponent
  ],
  exports: [
    KitButtonComponent,
    KitTextButtonComponent,
    KitRoundButtonComponent,
    KitFloatingActionButtonComponent,
    KitButtonGroupComponent,
    KitButtonGroupItemComponent,
    KitButtonGroupItemActiveDirective,
    KitButtonGroupItemIdleDirective,
    KitRadioButtonComponent
  ]
})
export class KitButtonModule { }