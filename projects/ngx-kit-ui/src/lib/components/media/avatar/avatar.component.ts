import { Component, Input } from '@angular/core';
import { KitImageComponent } from '../image/image.component';

@Component({
  selector: 'kit-avatar',
  imports: [KitImageComponent],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class KitAvatarComponent {
  @Input() src: string = '';
  @Input() alt: string = '';
  @Input() size: number = 40;
  @Input() borderRadius: string | number | undefined;

  get containerBorderRadius() {
    if (this.borderRadius) {
      if (typeof this.borderRadius === 'number') {
        return `${this.borderRadius}px`;
      }
      if (typeof this.borderRadius === 'string' && !isNaN(Number(this.borderRadius))) {
        return `${this.borderRadius}px`;
      }
      return this.borderRadius;
    }
    return 'var(--kit-avatar-border-radius)';
  }
}