
import { Component, Input, HostBinding } from '@angular/core';
import { ButtonColor } from '../../button/button-options';

export type DividerOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'kit-divider',
  standalone: true,
  imports: [],
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss']
})
export class KitDividerComponent {
  @Input() orientation: DividerOrientation = 'horizontal';
  @Input() color: ButtonColor | string = 'var(--kit-divider-default-color, #c8c8c8)';
  @Input() thickness: string = 'var(--kit-divider-default-thickness, 1px)';

  @HostBinding('style.width')
  get width(): string {
    return this.orientation === 'horizontal' ? '100%' : this.thickness;
  }

  @HostBinding('style.height')
  get height(): string {
    return this.orientation === 'vertical' ? '100%' : this.thickness;
  }

  @HostBinding('style.background-color')
  get backgroundColor(): string {
    return this.color;
  }

  // Add spacing directly on the host
  @HostBinding('style.margin')
  get margin(): string {
    return this.orientation === 'horizontal' ? 'var(--kit-divider-horizontal-margin, 0 16px)' : 'var(--kit-divider-vertical-margin, 16px 0)';
  }
}
