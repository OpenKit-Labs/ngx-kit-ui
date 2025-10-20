import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonColor } from '../button-options';
import { NgClass } from '@angular/common';

/**
 * A round/circular button component with different color schemes.
 */
@Component({
  selector: 'kit-button-round',
  standalone: true,
  imports: [NgClass],
  templateUrl: './round-button.component.html',
  styleUrls: ['./round-button.component.scss']
})
export class KitRoundButtonComponent {
  /**
   * The button's color scheme
   */
  @Input() color: ButtonColor = 'primary';

  /**
   * Whether the button is disabled
   */
  @Input() disabled: boolean = false;

  /**
   * Whether to apply the outline style to the button
   */
  @Input() outline: boolean = false;

  /**
   * Emitted when the button is clicked
   */
  @Output() clicked = new EventEmitter<void>();

  /**
   * Classes to apply to the button element
   */
  get buttonClasses(): string[] {
    const classes = ['kit-round-button'];

    // Add color class
    classes.push(`kit-round-button--${this.color}`);

    // Add outline class if needed
    if (this.outline) {
      classes.push('kit-round-button--outline');
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
