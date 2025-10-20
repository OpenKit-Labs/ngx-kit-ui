import { Component, Input, HostBinding } from '@angular/core';

/**
 * A component that expands to fill available space in flex containers.
 * Similar to Flutter's Expanded widget, it allows a child to expand to fill
 * available space along the main axis of its parent flex container.
 */
@Component({
  selector: 'kit-expanded',
  standalone: true,
  templateUrl: './expanded.component.html',
  styleUrls: ['./expanded.component.scss']
})
export class KitExpandedComponent {
  /**
   * The flex factor that determines how much space this expanded element 
   * takes relative to other expanded elements, similar to Flutter's flex property.
   * Default value is 1, meaning all expanded components will share space equally.
   * Higher values take proportionally more space.
   */
  @Input() flex: number = 1;

  /**
   * Apply the flex value as a style binding.
   * Uses the flex shorthand property for better control.
   */
  @HostBinding('style.flex')
  get flexValue(): string {
    // This combines:
    // - flex-grow: ${this.flex} (takes up available space proportionally)
    // - flex-shrink: 1 (allows shrinking if needed) 
    // - flex-basis: 0px (start from zero size before growing)
    return `${this.flex} 1 0px`;
  }
}