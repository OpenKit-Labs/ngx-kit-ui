import { Component, Input, HostBinding } from '@angular/core';
import { SpacingValue } from '../layout-options';

/**
 * A component that creates empty space, similar to Flutter's Spacer widget.
 * Used within flex containers to push elements apart or create fixed spacing.
 */
@Component({
  selector: 'kit-spacer',
  standalone: true,
  templateUrl: './spacer.component.html',
  styleUrls: ['./spacer.component.scss']
})
export class KitSpacerComponent {
  /**
   * The flex value for distributing space in flex containers.
   * Default is 1, similar to Flutter's default.
   */
  @Input() flex: number = 1;

  /**
   * Fixed size value that determines the size of this spacer.
   * Uses the same spacing scale as margin and padding components.
   */
  @Input() size?: SpacingValue = 16;

  /**
   * Apply the flex value as a style binding when no fixed size is provided.
   * When size is provided, it takes precedence over flex.
   */
  @HostBinding('style')
  get spacerStyle(): { [key: string]: string } {
    if (this.size !== undefined) {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`,
        flex: 'none'
      };
    }

    return {
      flex: `${this.flex}`
    };
  }
}