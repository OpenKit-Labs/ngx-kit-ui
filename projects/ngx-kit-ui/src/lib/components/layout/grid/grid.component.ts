import { Component, HostBinding, Input } from '@angular/core';
import { SpacingValue } from '../layout-options';

type GridItemsAlignment = 'start' | 'end' | 'center' | 'stretch';
type GridContentAlignment = 'start' | 'end' | 'center' | 'stretch' | 'space-around' | 'space-between' | 'space-evenly';

@Component({
  selector: 'kit-grid',
  standalone: true,
  imports: [],
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class KitGridComponent {
  @HostBinding('style.display')
  readonly display = 'grid';

  /** Whether the grid should expand to fill the full width of its parent */
  @Input() fullWidth: boolean = false;

  @HostBinding('style.width')
  get widthStyle(): string | null {
    return this.fullWidth ? '100%' : null;
  }

  @Input() cols: number | string = 'none';
  @Input() rows: number | string = 'none';
  @Input() minCols?: number;
  @Input() maxCols?: number;
  @Input() minColWidth?: string;
  @Input() maxColWidth?: string;
  @Input() minRowHeight?: string;
  @Input() maxRowHeight?: string;
  @Input() rowGap?: SpacingValue;
  @Input() colGap?: SpacingValue;

  @Input() justifyItems?: GridItemsAlignment;
  @Input() alignItems?: GridItemsAlignment;
  @Input() justifyContent?: GridContentAlignment;
  @Input() alignContent?: GridContentAlignment;

  @HostBinding('style.grid-template-columns')
  get gridTemplateColumns(): string {
    if (this.minColWidth) {
      const min = this.minColWidth;
      const max = this.maxColWidth || '1fr';
      return `repeat(auto-fit, minmax(${min}, ${max}))`;
    }
    if (this.minCols !== undefined || this.maxCols !== undefined) {
      const min = this.minCols || 1;
      const max = this.maxCols || min;
      if (min === max) {
        return `repeat(${min}, 1fr)`;
      }
      return `repeat(auto-fit, minmax(${100 / max}%, 1fr))`;
    }
    if (typeof this.cols === 'number') {
      return `repeat(${this.cols}, 1fr)`;
    }
    if (typeof this.cols === 'string') {
      return this.cols;
    }
    return 'none';
  }

  @HostBinding('style.grid-template-rows')
  get gridTemplateRows(): string {
    if (this.minRowHeight) {
      const min = this.minRowHeight;
      const max = this.maxRowHeight || '1fr';
      // Keep grid-template-rows for explicit templates, but also set
      // grid-auto-rows so implicitly created rows (when items wrap)
      // receive the same min/max sizing. Using `auto-fit` here alone
      // doesn't affect implicit rows created by auto-placement.
      return `repeat(auto-fit, minmax(${min}, ${max}))`;
    }
    if (typeof this.rows === 'number') {
      return `repeat(${this.rows}, 1fr)`;
    }
    if (typeof this.rows === 'string') {
      return this.rows;
    }
    return 'none';
  }

  /**
   * When consumers provide `minRowHeight` we should also set
   * `grid-auto-rows` so that implicitly generated rows (when
   * items wrap to additional rows) use the same min/max sizing.
   */
  @HostBinding('style.grid-auto-rows')
  get gridAutoRows(): string | null {
    if (this.minRowHeight) {
      const min = this.minRowHeight;
      const max = this.maxRowHeight || '1fr';
      return `minmax(${min}, ${max})`;
    }
    return null;
  }

  @HostBinding('style.row-gap')
  get rowGapStyle(): string | null {
    if (this.rowGap !== undefined) {
      return `${this.rowGap}px`;
    }
    return null;
  }

  @HostBinding('style.column-gap')
  get colGapStyle(): string | null {
    if (this.colGap !== undefined) {
      return `${this.colGap}px`;
    }
    return null;
  }

  @HostBinding('style.justify-items')
  get justifyItemsStyle(): GridItemsAlignment | null {
    return this.justifyItems ?? null;
  }

  @HostBinding('style.align-items')
  get alignItemsStyle(): GridItemsAlignment | null {
    return this.alignItems ?? null;
  }

  @HostBinding('style.justify-content')
  get justifyContentStyle(): GridContentAlignment | null {
    return this.justifyContent ?? null;
  }

  @HostBinding('style.align-content')
  get alignContentStyle(): GridContentAlignment | null {
    return this.alignContent ?? null;
  }
}
