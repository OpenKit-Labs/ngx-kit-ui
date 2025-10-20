import { Component, HostBinding, Input } from '@angular/core';
import { MainAxisAlignment, CrossAxisAlignment } from '../layout-options';
import { SpacingValue } from '../layout-options';

@Component({
  selector: 'kit-column',
  standalone: true,
  imports: [],
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class KitColumnComponent {
  // --- BASE STYLES ---
  @HostBinding('style.display')
  readonly display = 'flex';

  @HostBinding('style.flex-direction')
  readonly flexDirection = 'column'; // The key change for a column

  // --- INPUT-BASED STYLES ---
  /** Controls alignment along the main axis (vertical for column) */
  @Input() mainAxisAlignment: MainAxisAlignment = 'start';

  /** Controls alignment along the cross axis (horizontal for column) */
  @Input() crossAxisAlignment: CrossAxisAlignment = 'start';

  /** Controls the spacing between children */
  @Input() gap?: SpacingValue;

  /** Controls whether the column should wrap its children */
  @Input() wrap: boolean = false;

  /** Controls whether the column should take up the full width of its parent */
  @Input() fullWidth: boolean = false;

  /** Controls whether the column should take up the full height of its parent */
  @Input() fullHeight: boolean = false;

  @HostBinding('style.justify-content')
  get justifyContent(): string {
    const mapping: { [key in MainAxisAlignment]: string } = {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
      between: 'space-between',
      around: 'space-around',
      evenly: 'space-evenly'
    };
    return mapping[this.mainAxisAlignment];
  }

  @HostBinding('style.align-items')
  get alignItems(): string {
    const mapping: { [key in CrossAxisAlignment]: string } = {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
      stretch: 'stretch'
    };
    return mapping[this.crossAxisAlignment];
  }

  @HostBinding('style.flex-wrap')
  get flexWrap(): string {
    return this.wrap ? 'wrap' : 'nowrap';
  }

  @HostBinding('style.gap')
  get gapStyle(): string | null {
    return this.gap !== undefined ? `${this.gap}px` : null;
  }

  @HostBinding('style.width')
  get widthStyle(): string | null {
    return this.fullWidth ? '100%' : null;
  }

  @HostBinding('style.height')
  get heightStyle(): string | null {
    return this.fullHeight ? '100%' : null;
  }

  @HostBinding('style.flex')
  get flexStyle(): string | null {
    return this.fullHeight ? '1 1 0px' : null;
  }
}