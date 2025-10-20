import { Component, EventEmitter, Input, Output } from '@angular/core';
import { KitTextCaptionComponent } from '../../text/text-caption/text-caption.component';
import { KitInputFieldTitleComponent } from '../input-field-title/input-field-title.component';
import { KitBaseInputComponent } from '../base/base-input.component';

@Component({
  selector: 'kit-input-email',
  templateUrl: './input-email.component.html',
  styleUrls: ['./input-email.component.scss'],
  standalone: true,
  imports: [KitInputFieldTitleComponent, KitTextCaptionComponent]
})
export class KitInputEmailComponent extends KitBaseInputComponent<string> {
  /**
   * Whether the field is required
   */
  @Input() required: boolean = false;

  /**
   * Pattern for email validation
   * Default is a basic email validation pattern
   */
  @Input() pattern: string = '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$';

  @Output() paste = new EventEmitter<string>();

  /**
   * Return the component prefix for ID generation
   */
  protected getComponentPrefix(): string {
    return 'input-email';
  }

  /**
   * Validate if the input is a valid email format
   * @returns boolean indicating if the email format is valid
   */
  isValidEmail(): boolean {
    if (!this.value) return !this.required;

    const emailRegex = new RegExp(this.pattern, 'i');
    return emailRegex.test(this.value);
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