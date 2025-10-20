import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'kit-constrained-box',
  imports: [],
  templateUrl: './constrained-box.component.html',
  styleUrl: './constrained-box.component.scss'
})
export class KitConstrainedBoxComponent {
  @Input() minWidth?: string;
  @Input() maxWidth?: string;
  @Input() minHeight?: string;
  @Input() maxHeight?: string;

  @HostBinding('style.minWidth')
  get minWidthStyle(): string | undefined {
    return this.minWidth;
  }

  @HostBinding('style.maxWidth')
  get maxWidthStyle(): string | undefined {
    return this.maxWidth;
  }

  @HostBinding('style.minHeight')
  get minHeightStyle(): string | undefined {
    return this.minHeight;
  }

  @HostBinding('style.maxHeight')
  get maxHeightStyle(): string | undefined {
    return this.maxHeight;
  }
}
