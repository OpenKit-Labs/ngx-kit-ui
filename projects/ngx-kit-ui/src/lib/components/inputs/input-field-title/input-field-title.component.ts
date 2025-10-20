import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

/**
 * Form label component for all form controls within the library.
 * This component is meant for internal use only.
 */
@Component({
  selector: 'kit-input-field-title',
  standalone: true,
  imports: [NgClass],
  templateUrl: './input-field-title.component.html',
  styleUrls: ['./input-field-title.component.scss']
})
export class KitInputFieldTitleComponent {
  /**
   * Optional ID for the label element
   */
  @Input() for: string = '';

  /**
   * Whether the field is required
   */
  @Input() required: boolean = false;

  /**
   * Whether the label is disabled (will be styled accordingly)
   */
  @Input() disabled: boolean = false;

  /**
   * Apply classes based on component state
   */
  get labelClasses(): string[] {
    const classes = ['kit-input-field-title'];

    if (this.disabled) {
      classes.push('kit-input-field-title--disabled');
    }

    if (this.required) {
      classes.push('kit-input-field-title--required');
    }

    return classes;
  }
}