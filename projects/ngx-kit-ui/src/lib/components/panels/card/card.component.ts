import { NgClass } from '@angular/common';
import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';

/**
 * Available card elevations that determine the shadow depth
 */
export type CardElevation = 'none' | 'low' | 'medium' | 'high';

/**
 * A card component that displays content in an elevated, contained surface.
 * Cards can be clickable and support different elevation levels.
 */
@Component({
  selector: 'kit-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class KitCardComponent {
  /**
   * The elevation level of the card (affects shadow depth)
   */
  @Input() elevation: CardElevation = 'low';

  /**
   * Whether the card is clickable
   */
  @Input() clickable: boolean = false;

  /**
   * Whether the card is disabled (only applies to clickable cards)
   */
  @Input() disabled: boolean = false;

  /**
   * Whether the card should take up the full width of its container
   */
  @Input() fullWidth: boolean = false;

  /**
   * Whether the card should take up the full height of its container
   */
  @Input() fullHeight: boolean = false;

  /**
   * Emitted when the card is clicked (only for clickable cards)
   */
  @Output() clicked = new EventEmitter<MouseEvent>();

  /**
   * Apply the clickable class to the host element when clickable is true
   */
  @HostBinding('class.clickable')
  get isClickable(): boolean {
    return this.clickable && !this.disabled;
  }

  /**
   * Apply the full-width class to the host element when fullWidth is true
   */
  @HostBinding('class.full-width')
  get isFullWidth(): boolean {
    return this.fullWidth;
  }

  /**
   * Apply the full-height class to the host element when fullHeight is true
   */
  @HostBinding('class.full-height')
  get isFullHeight(): boolean {
    return this.fullHeight;
  }

  /**
   * Classes to apply to the card element
   */
  get cardClasses(): string[] {
    const classes = ['kit-card'];

    // Add elevation class
    classes.push(`kit-card--${this.elevation}`);

    // Add clickable class if needed
    if (this.clickable) {
      classes.push('kit-card--clickable');
    }

    // Add disabled class if needed
    if (this.disabled && this.clickable) {
      classes.push('kit-card--disabled');
    }

    // Add full width class if needed
    if (this.fullWidth) {
      classes.push('kit-card--full-width');
    }

    return classes;
  }

  /**
   * Handle card click
   */
  handleClick(event: MouseEvent): void {
    if (this.clickable && !this.disabled) {
      this.clicked.emit(event);
    }
  }

}
