import { Component, EventEmitter, Input, Output } from '@angular/core';
import { KitTextCaptionComponent } from '../../text/text-caption/text-caption.component';
import { KitInputFieldTitleComponent } from '../input-field-title/input-field-title.component';
import { KitBaseInputComponent } from '../base/base-input.component';

@Component({
  selector: 'kit-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss'],
  standalone: true,
  imports: [KitInputFieldTitleComponent, KitTextCaptionComponent]
})
export class KitInputPasswordComponent extends KitBaseInputComponent<string> {
  /**
   * Whether the field is required
   */
  @Input() required: boolean = false;

  @Output() paste = new EventEmitter<string>();
  /**
   * Controls whether the password is shown or hidden
   */
  showPassword: boolean = false;

  /**
   * Return the component prefix for ID generation
   */
  protected getComponentPrefix(): string {
    return 'input-password';
  }

  /**
   * Toggles the password visibility
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Handle input change event from the DOM
   */
  onInputChange(event: Event): void {
    const newValue = (event.target as HTMLInputElement).value;
    this.onValueChange(newValue);
  }

  handlePasteEvent(event: ClipboardEvent): void {
    const pastedData = event.clipboardData?.getData('text') || '';
    this.paste.emit(pastedData);
  }
}