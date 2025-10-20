import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'kit-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class KitContainerComponent {

  // Sizing
  @Input() width?: string;
  @Input() height?: string;
  @Input() minWidth?: string;
  @Input() minHeight?: string;
  @Input() maxWidth?: string;
  @Input() maxHeight?: string;

  // Mirror sizing inputs to the host element so percentage values behave as expected
  @HostBinding('style.width') get hostWidth(): string | undefined {
    return this.width;
  }

  @HostBinding('style.height') get hostHeight(): string | undefined {
    return this.height;
  }

  @HostBinding('style.min-width') get hostMinWidth(): string | undefined {
    return this.minWidth;
  }

  @HostBinding('style.min-height') get hostMinHeight(): string | undefined {
    return this.minHeight;
  }

  @HostBinding('style.max-width') get hostMaxWidth(): string | undefined {
    return this.maxWidth;
  }

  @HostBinding('style.max-height') get hostMaxHeight(): string | undefined {
    return this.maxHeight;
  }

  // Spacing
  @Input() padding?: string;
  @Input() margin?: string;

  // Text color
  @Input() color?: string;

  // Box styles
  @Input() borderRadius?: string;
  @Input() boxShadow?: string;
  @Input() border?: string;

  // Background
  @Input() backgroundColor?: string;
  @Input() backgroundImage?: string;
}