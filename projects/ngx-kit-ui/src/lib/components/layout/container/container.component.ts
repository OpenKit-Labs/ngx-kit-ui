import { Component, Input, HostBinding, effect } from '@angular/core';
import { KitScreenService, ScreenSize } from '../../../services/screen/screen.service';

/**
 * A responsive container that constrains its content width based on the current screen size.
 * Integrates with KitScreenService to apply breakpoint-driven max-width constraints.
 *
 * Use this to wrap page content that should respect breakpoints,
 * while placing full-width content outside of it.
 */
@Component({
  selector: 'kit-container',
  standalone: true,
  imports: [],
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class KitContainerComponent {

  /**
   * When true, disables the responsive max-width constraint.
   * The container will span the full width of its parent.
   */
  @Input() fullWidth: boolean = false;

  /**
   * Current breakpoint-driven host class, e.g. 'kit-container-small'
   */
  @HostBinding('class') public containerClass: string = 'kit-container-small';

  constructor(private screenService: KitScreenService) {
    effect(() => {
      const size = this.screenService.currentSize();
      this.updateContainerClass(size);
    });
  }

  private updateContainerClass(size: ScreenSize): void {
    if (this.fullWidth) {
      this.containerClass = 'kit-container-full';
      return;
    }
    switch (size) {
      case 'small':
        this.containerClass = 'kit-container-small';
        break;
      case 'medium':
        this.containerClass = 'kit-container-medium';
        break;
      case 'large':
        this.containerClass = 'kit-container-large';
        break;
      default:
        this.containerClass = 'kit-container-small';
    }
  }
}