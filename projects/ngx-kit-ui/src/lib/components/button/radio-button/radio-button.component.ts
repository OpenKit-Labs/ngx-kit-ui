import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { ButtonColor } from '../button-options';
import { NgClass } from '@angular/common';

@Component({
  selector: 'kit-button-radio',
  standalone: true,
  imports: [NgClass],
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class KitRadioButtonComponent {
  @Input() color: ButtonColor = 'primary';
  @Input() disabled: boolean = false;
  @Input() fullWidth: boolean = false;
  @Input() outline: boolean = false;

  @Input() active: boolean = false;
  @Output() activeChange = new EventEmitter<boolean>();

  @HostBinding('class.full-width')
  get isFullWidth(): boolean {
    return this.fullWidth;
  }

  get buttonClasses(): string[] {
    const classes = ['kit-radio-button'];

    classes.push(`kit-radio-button--${this.color}`);

    if (this.outline) {
      classes.push('kit-radio-button--outline');
    }

    if (this.fullWidth) {
      classes.push('kit-radio-button--full-width');
    }

    if (this.active) {
      classes.push('kit-radio-button--active');
    }

    return classes;
  }

  handleClick(): void {
    if (!this.disabled) {
      this.active = !this.active;
      this.activeChange.emit(this.active);
    }
  }
}
