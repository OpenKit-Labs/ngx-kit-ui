import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KitInputTextComponent } from './input-text/input-text.component';
import { KitInputNumberComponent } from './input-number/input-number.component';
import { KitInputEmailComponent } from './input-email/input-email.component';
import { KitInputPasswordComponent } from './input-password/input-password.component';
import { KitInputOtpComponent } from './input-otp/input-otp.component';
import { KitInputSelectComponent } from './input-select/input-select.component';
import { KitInputPhoneComponent } from './input-phone/input-phone.component';
import { KitSelectItemDirective } from './base/kit-select-item.directive';
import { KitSelectItemActiveDirective } from './base/kit-select-item-active.directive';
import { KitInputTextareaComponent } from './input-textarea/input-textarea.component';
import { KitInputTimeComponent } from './input-time/input-time.component';
import { KitInputDateComponent } from './input-date/input-date.component';
import { KitInputMultiSelectComponent } from './input-multi-select/input-multi-select.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,

    //Components
    KitInputTextComponent,
    KitInputTextareaComponent,
    KitInputNumberComponent,
    KitInputEmailComponent,
    KitInputPasswordComponent,
    KitInputOtpComponent,
    KitInputPhoneComponent,
    KitInputSelectComponent,
    KitInputMultiSelectComponent,
    KitSelectItemDirective,
    KitSelectItemActiveDirective,
    KitInputTimeComponent,
    KitInputDateComponent
  ],
  exports: [
    KitInputTextComponent,
    KitInputTextareaComponent,
    KitInputNumberComponent,
    KitInputEmailComponent,
    KitInputPasswordComponent,
    KitInputOtpComponent,
    KitInputPhoneComponent,
    KitInputSelectComponent,
    KitInputMultiSelectComponent,
    KitSelectItemDirective,
    KitSelectItemActiveDirective,
    KitInputTimeComponent,
    KitInputDateComponent
  ]
})
export class KitInputModule { }