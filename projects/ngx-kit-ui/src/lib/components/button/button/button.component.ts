import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { ButtonColor } from '../button-options';
import { NgClass } from '@angular/common';

/**
 * A standard button component with different color schemes.
 */
@Component({
  selector: 'kit-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class KitButtonComponent {
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
   * Whether to apply the outline style to the button
   */
  @Input() outline: boolean = false;

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
    const classes = ['kit-button'];

    // Add color class
    classes.push(`kit-button--${this.color}`);

    // Add outline class if needed
    if (this.outline) {
      classes.push('kit-button--outline');
    }

    // Add full width class if needed
    if (this.fullWidth) {
      classes.push('kit-button--full-width');
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