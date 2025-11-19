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
