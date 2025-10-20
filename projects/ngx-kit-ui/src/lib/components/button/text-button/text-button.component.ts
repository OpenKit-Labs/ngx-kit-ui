import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { ButtonColor } from '../button-options';
import { NgClass } from '@angular/common';

/**
 * A text button component that appears as clickable text.
 */
@Component({
  selector: 'kit-button-text',
  standalone: true,
  imports: [NgClass],
  templateUrl: './text-button.component.html',
  styleUrls: ['./text-button.component.scss']
})
export class KitTextButtonComponent {
  /**
   * The button's color scheme
   */
  @Input() color: ButtonColor = 'primary';

  /**
   * Whether the button is disabled
   */
  @Input() disabled: boolean = false;

  /**
   * Whether the button should take up the full width of its container
   */
  @Input() fullWidth: boolean = false;

  /**
   * Emitted when the button is clicked
   */
  @Output() clicked = new EventEmitter<void>();

  /**
   * Apply the full-width class to the host element when fullWidth is true
   */
  @HostBinding('class.full-width')
  get isFullWidth(): boolean {
    return this.fullWidth;
  }

  /**
   * Classes to apply to the button element
   */
  get buttonClasses(): string[] {
    const classes = ['kit-text-button'];

    // Add color class
    classes.push(`kit-text-button--${this.color}`);

    // Add full width class if needed
    if (this.fullWidth) {
      classes.push('kit-text-button--full-width');
    }

    return classes;
  }

  /**
   * Handle button click
   */
  handleClick(event: MouseEvent): void {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }
}