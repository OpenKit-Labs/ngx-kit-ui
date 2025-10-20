import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface KitSimpleTableColumn {
  title: string;
  /**
   * Field name to lookup on each row. Supports nested paths using dot notation
   * (for example: `verification.assetItemId`). If the path doesn't exist the
   * table will render an empty string. A custom `formatter` may be provided to
   * transform the resolved value.
   */
  lookupField: string;
  formatter?: (value: any) => string;
}

// The table definition is represented as an array of columns
export type KitSimpleTableDefinition = KitSimpleTableColumn[];

@Component({
  selector: 'kit-simple-table',
  imports: [],
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.scss']
})
export class SimpleTableComponent {

  @Input() definition: KitSimpleTableDefinition = [];
  @Input() dataset: any[] = [];

  @Output() cellSelect = new EventEmitter<any>();
  @Output() rowSelect = new EventEmitter<any>();

  // current active sort field (lookup path) and direction
  public currentSortField: string | null = null;
  public currentSortDirection: 'asc' | 'desc' | null = null;

  /**
   * Public getter that returns the dataset sorted according to the current
   * sort state. Does not mutate the original `dataset` input.
   */
  get displayDataset(): any[] {
    if (!this.currentSortField || !this.currentSortDirection) return this.dataset || [];

    const dir = this.currentSortDirection === 'asc' ? 1 : -1;
    const field = this.currentSortField;

    // shallow copy to avoid mutating the input
    return [...(this.dataset || [])].sort((a, b) => {
      const va = this.resolvePath(a, field);
      const vb = this.resolvePath(b, field);

      // normalize undefined/null
      if (va == null && vb == null) return 0;
      if (va == null) return -1 * dir;
      if (vb == null) return 1 * dir;

      // numbers
      if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * dir;

      // dates
      if (va instanceof Date && vb instanceof Date) return (va.getTime() - vb.getTime()) * dir;

      // fallback to string comparison
      const sa = String(va);
      const sb = String(vb);
      return sa.localeCompare(sb) * dir;
    });
  }

  getCellValue(row: any, column: KitSimpleTableColumn): any {

    // reuse shared resolver for nested lookup paths
    const rawValue = this.resolvePath(row, column.lookupField);

    // If a formatter is provided, use it to transform the value. Keep a try/catch
    // so a bad formatter doesn't break the table rendering.
    if (column.formatter) {
      try {
        return column.formatter(rawValue);
      } catch (e) {
        // Log the error and fall back to the raw value
        // eslint-disable-next-line no-console
        console.error('KitSimpleTable: formatter threw an error for field', column.lookupField, e);
        return rawValue !== undefined ? rawValue : '';
      }
    }

    return rawValue !== undefined ? rawValue : '';
  }

  onCellSelected(row: any, column: KitSimpleTableColumn): void {
    this.cellSelect.emit({ row, column });
  }

  onRowSelected(row: any): void {
    this.rowSelect.emit(row);
  }

  /**
   * Toggle sort state for a column: none -> asc -> desc -> none
   */
  toggleSort(column: KitSimpleTableColumn): void {
    const field = column.lookupField;
    if (this.currentSortField !== field) {
      this.currentSortField = field;
      this.currentSortDirection = 'asc';
      return;
    }

    if (this.currentSortDirection === 'asc') {
      this.currentSortDirection = 'desc';
      return;
    }

    // currently 'desc' -> clear
    this.currentSortField = null;
    this.currentSortDirection = null;
  }

  /**
   * Resolve nested lookup paths like `verification.assetItemId`.
   */
  private resolvePath(obj: any, path: string | undefined): any {
    if (!obj || !path) return undefined;
    // quick return for direct property (common case)
    if (Object.prototype.hasOwnProperty.call(obj, path)) return obj[path];

    const parts = path.split('.');
    let current: any = obj;
    for (const part of parts) {
      if (current == null) return undefined; // covers null and undefined
      // if current is an object/array, access the key/index
      if (Object.prototype.hasOwnProperty.call(current, part) || (Array.isArray(current) && !isNaN(Number(part)))) {
        current = current[part as any];
      } else {
        // last-ditch attempt: try direct property access (handles prototype accessors)
        current = (current as any)[part];
      }
    }
    return current;
  }
}
