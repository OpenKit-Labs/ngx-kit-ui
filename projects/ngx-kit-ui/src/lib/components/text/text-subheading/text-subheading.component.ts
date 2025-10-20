import { Component, Input } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'kit-text-subheading',
  standalone: true,
  imports: [NgClass, NgStyle],
  templateUrl: './text-subheading.component.html',
  styleUrls: ['./text-subheading.component.scss']
})
export class KitTextSubheadingComponent {
  @Input() color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'muted' | '' = '';
  @Input() align?: 'left' | 'center' | 'right' | 'justify';
  @Input() weight?: 'light' | 'normal' | 'medium' | 'bold' | number;
  @Input() decoration?: 'none' | 'underline' | 'line-through' | 'overline';
  @Input() margin?: string;
  @Input() wrap: boolean = true;
  @Input() ellipses: boolean = false;
  @Input() lines: number = 0;
  @Input() italic: boolean = false;

  get colorClass(): string {
    return this.color ? `kit-text-${this.color}` : '';
  }

  get textStyles() {
    const baseStyles: { [key: string]: any } = {
      'margin': this.margin,
      'text-align': this.align,
      'font-weight': this.weight,
      'text-decoration': this.decoration,
      'font-style': this.italic ? 'italic' : 'normal'
    };

    if (this.ellipses) {
      if (this.wrap && this.lines > 0) {
        // Multi-line ellipsis
        baseStyles['display'] = '-webkit-box';
        baseStyles['-webkit-line-clamp'] = this.lines;
        baseStyles['-webkit-box-orient'] = 'vertical';
        baseStyles['overflow'] = 'hidden';
      } else {
        // Single-line ellipsis
        baseStyles['white-space'] = 'nowrap';
        baseStyles['overflow'] = 'hidden';
        baseStyles['text-overflow'] = 'ellipsis';
      }
    } else {
      // Wrapping control
      baseStyles['white-space'] = this.wrap ? 'normal' : 'nowrap';
    }

    return baseStyles;
  }
}
