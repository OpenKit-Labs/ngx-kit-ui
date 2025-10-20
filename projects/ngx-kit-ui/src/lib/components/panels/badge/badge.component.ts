
import { Component, Input, HostBinding } from '@angular/core';
import { ButtonColor } from '../../button/button-options';
import { NgClass } from '@angular/common';

@Component({
  selector: 'kit-badge',
  standalone: true,
  imports: [NgClass],
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class KitBadgeComponent {
  @Input() color: ButtonColor = 'primary';
  @Input() active: boolean = true;
  @Input() fullWidth: boolean = false;

  @HostBinding('class.full-width')
  get isFullWidth(): boolean {
    return this.fullWidth;
  }

  get badgeClasses(): string[] {
    const classes = ['kit-badge'];
    classes.push(`kit-badge--${this.color}`);
    if (!this.active) {
      classes.push('kit-badge--inactive');
    }
    if (this.fullWidth) {
      classes.push('kit-badge--full-width');
    }
    return classes;
  }
}
