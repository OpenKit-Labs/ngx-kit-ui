import { Component, EventEmitter, Input, Output } from '@angular/core';
import { KitTextCaptionComponent } from '../../text/text-caption/text-caption.component';
import { KitInputFieldTitleComponent } from '../input-field-title/input-field-title.component';
import { KitBaseInputComponent } from '../base/base-input.component';

@Component({
  selector: 'kit-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'],
  standalone: true,
  imports: [KitInputFieldTitleComponent, KitTextCaptionComponent]
})
export class KitInputNumberComponent extends KitBaseInputComponent<number | null> {
  /**
   * Whether the field is required
   */
  @Input() required: boolean = false;

  /**
   * Minimum allowed value
   */
  @Input() min?: number;

  /**
   * Maximum allowed value
   */
  @Input() max?: number;

  /**
   * Step value for the input
   */
  @Input() step: number = 1;

  @Output() paste = new EventEmitter<string>();
  /**
   * Return the component prefix for ID generation
   */
  protected getComponentPrefix(): string {
    return 'input-number';
  }

  /**
   * Override default value to return null instead of empty string
   */
  override getDefaultValue(): number | null {
    return null;
  }

  /**
   * Handle input change event from the DOM
   */
  onInputChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    // Convert to number or null if empty
    const newValue = inputValue === '' ? null : parseFloat(inputValue);
    this.onValueChange(newValue);
  }

  handlePasteEvent(event: ClipboardEvent): void {
    const pastedData = event.clipboardData?.getData('text') || '';
    this.paste.emit(pastedData);
  }
}