import { Component, EventEmitter, Input, Output } from '@angular/core';
import { KitTextCaptionComponent } from '../../text/text-caption/text-caption.component';
import { KitInputFieldTitleComponent } from '../input-field-title/input-field-title.component';
import { KitBaseInputComponent } from '../base/base-input.component';

@Component({
  selector: 'kit-input-textarea',
  templateUrl: './input-textarea.component.html',
  styleUrls: ['./input-textarea.component.scss'],
  standalone: true,
  imports: [KitInputFieldTitleComponent, KitTextCaptionComponent]
})
export class KitInputTextareaComponent extends KitBaseInputComponent<string> {
  /**
   * Whether the field is required
   */
  @Input() required: boolean = false;

  @Output() paste = new EventEmitter<string>();

  /**
   * Return the component prefix for ID generation
   */
  protected getComponentPrefix(): string {
    return 'input-textarea';
  }

  /**
   * Handle input change event from the DOM
   */
  onInputChange(event: Event): void {
    const newValue = (event.target as HTMLTextAreaElement).value;
    this.onValueChange(newValue);
  }

  handlePasteEvent(event: ClipboardEvent): void {
    this.paste.emit(event.clipboardData?.getData('text') || '');
  }
}
