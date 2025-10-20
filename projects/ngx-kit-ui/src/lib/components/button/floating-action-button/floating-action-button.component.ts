import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonColor } from '../button-options';
import { NgClass } from '@angular/common';

/**
 * Positions where the floating action button can be placed
 */
export type FloatingActionButtonPosition = 'bottom-right' | 'bottom-left' | 'bottom-center' | 'top-right' | 'top-left' | 'center-right' | 'center-left' | 'center-center';

/**
 * A floating action button component that uses a round button internally and can be positioned in various locations.
 */
@Component({
  selector: 'kit-button-floating-action',
  standalone: true,
  imports: [NgClass],
  templateUrl: './floating-action-button.component.html',
  styleUrls: ['./floating-action-button.component.scss']
})
export class KitFloatingActionButtonComponent {
  /**
   * The position of the floating action button
   */
  @Input() position: FloatingActionButtonPosition = 'bottom-right';

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
   * Handle button click
   */
  handleClick(event: MouseEvent): void {
    this.clicked.emit();
  }

  /**
   * Classes to apply to the container of the floating action button
   */
  get containerClasses(): string[] {
    return ['kit-floating-action-button', `kit-floating-action-button--${this.position}`];
  }

  /**
   * Classes to apply to the button element
   */
  get buttonClasses(): string[] {
    const classes = ['kit-floating-action-button__button'];

    // Add color class
    classes.push(`kit-floating-action-button__button--${this.color}`);

    // Add outline class if needed
    if (this.outline) {
      classes.push('kit-floating-action-button__button--outline');
    }

    return classes;
  }
}
