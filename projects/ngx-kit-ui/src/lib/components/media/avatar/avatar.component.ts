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
  @Input() size: string | number = 40;
  @Input() borderRadius: string | number | undefined;

  /** Return size as a valid CSS value (e.g. `40px` or `3rem`) */
  get sizePx(): string {
    if (typeof this.size === 'number') {
      return `${this.size}px`;
    }
    if (typeof this.size === 'string' && !isNaN(Number(this.size))) {
      return `${Number(this.size)}px`;
    }
    return this.size as string;
  }

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