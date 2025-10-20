import { Component, HostBinding, Input } from '@angular/core';
import { MainAxisAlignment, CrossAxisAlignment } from '../layout-options';
import { SpacingValue } from '../layout-options';

@Component({
  selector: 'kit-row',
  standalone: true,
  imports: [],
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class KitRowComponent {
  // --- BASE STYLES ---
  @HostBinding('style.display')
  readonly display = 'flex';

  @HostBinding('style.flex-direction')
  readonly flexDirection = 'row';

  // --- INPUT-BASED STYLES ---
  @Input() mainAxisAlignment: MainAxisAlignment = 'start';
  @Input() crossAxisAlignment: CrossAxisAlignment = 'center';
  @Input() gap?: SpacingValue;
  @Input() wrap: boolean = false;
  @Input() fullWidth: boolean = false;
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
}