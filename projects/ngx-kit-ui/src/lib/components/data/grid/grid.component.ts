import { Component, Input, HostBinding, OnInit, OnChanges, SimpleChanges, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KitDataGridColumn } from './grid-column.model';
import { GridStyleConfig } from './grid-style-config.model';
import { KitDataGridCellHostDirective } from './directives/cells/grid-cell-host.directive';
import { KitDataGridHeaderHostDirective } from './directives/headers/grid-header-host.directive';
import { KitDataGridCellEvent } from './models/cell-event.model';
import { KitDataGridHeaderEvent } from './models/header-event.model';

/**
 * Data grid component with strongly typed event emissions.
 * 
 * @template T - The type of data in the grid
 * 
 * @example
 * ```typescript
 * interface User {
 *   id: number;
 *   name: string;
 *   email: string;
 * }
 * 
 * export class UsersComponent {
 *   users: User[] = [...];
 *   columns: KitDataGridColumn<User>[] = [
 *     { header: 'Name', field: 'name', type: 'text' },
 *     { header: 'Email', field: 'email', type: 'email' }
 *   ];
 *   
 *   onCellAction(event: KitDataCellEvent<User>): void {
 *     // event.row has type User
 *     // event.column has type KitDataGridColumn<User>
 *     // event.value contains any emitted value
 *   }
 *   
 *   onHeaderAction(event: KitDataHeaderEvent<User>): void {
 *     // event.column has type KitDataGridColumn<User>
 *     // event.value contains filter/sort value
 *   }
 * }
 * ```
 */
@Component({
    selector: 'kit-data-grid',
    standalone: true,
    imports: [CommonModule, KitDataGridCellHostDirective, KitDataGridHeaderHostDirective],
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss'],
})
export class KitDataGridComponent<T = any> implements OnInit, OnChanges, AfterViewInit, OnDestroy {
    @Input() data: T[] = [];
    @Input() columns: KitDataGridColumn<T>[] = [];
    @Input() styleConfig?: GridStyleConfig;
    @Input() stickyHeader: boolean = true;

    /**
     * Emitted when a cell renderer triggers an action.
     * 
     * Parent components should subscribe to this to handle cell events
     * with full type safety and contextual information.
     */
    @Output() onCellEvent = new EventEmitter<KitDataGridCellEvent<T>>();

    /**
     * Emitted when a header renderer triggers an action.
     * 
     * Parent components should subscribe to this to handle header events
     * (e.g., sorting, filtering) with full type safety.
     */
    @Output() onHeaderEvent = new EventEmitter<KitDataGridHeaderEvent<T>>();

    @HostBinding('style') gridStyles: string = '';

    @ViewChild('gridContainer') gridContainer?: ElementRef<HTMLElement>;

    private resizeObserver?: ResizeObserver;
    private measuredColumnWidths: Map<number, number> = new Map();
    private measurementTimeout?: number;

    ngOnInit(): void {
        // Initial setup - will be overridden by measurements in ngAfterViewInit
        this.updateGridStyles();
    }

    ngOnChanges(changes: SimpleChanges): void {
        // Only update if columns config changed, don't override measurements
        if (changes['styleConfig']) {
            this.updateGridStyles();
        }

        // Clear measurements when data or columns change
        if (changes['data'] || changes['columns']) {
            this.measuredColumnWidths.clear();
            this.scheduleMeasurement();
        }
    }

    ngAfterViewInit(): void {
        this.setupResizeObserver();
        this.scheduleMeasurement();
    }

    ngOnDestroy(): void {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
        if (this.measurementTimeout) {
            clearTimeout(this.measurementTimeout);
        }
    }

    /**
     * Handles cell action events from host directives and re-emits them.
     * @internal Used by template
     */
    onCellAction(event: KitDataGridCellEvent<T>): void {
        this.onCellEvent.emit(event);
    }

    /**
     * Handles header action events from host directives and re-emits them.
     * @internal Used by template
     */
    onHeaderAction(event: KitDataGridHeaderEvent<T>): void {
        this.onHeaderEvent.emit(event);
    }

    /**
     * Schedule content measurement with debounce to avoid excessive recalculations
     */
    private scheduleMeasurement(): void {
        if (this.measurementTimeout) {
            clearTimeout(this.measurementTimeout);
        }
        this.measurementTimeout = window.setTimeout(() => {
            this.measureContentAndUpdateStyles();
        }, 100);
    }

    /**
     * Setup ResizeObserver to detect when grid or content sizes change
     */
    private setupResizeObserver(): void {
        if (!this.gridContainer) return;

        this.resizeObserver = new ResizeObserver(() => {
            this.scheduleMeasurement();
        });

        this.resizeObserver.observe(this.gridContainer.nativeElement);
    }

    /**
     * Measure the natural width of content in each column and update grid layout
     */
    private measureContentAndUpdateStyles(): void {
        console.log('UPDATING MEASEUREMENTS');
        if (!this.gridContainer) return;

        const container = this.gridContainer.nativeElement;
        const cells = container.querySelectorAll('.kit-data-grid-cell');

        if (cells.length === 0) return;

        // Measure each column
        const columnCount = this.columns.length;
        const columnMeasurements: number[] = new Array(columnCount).fill(0);

        cells.forEach((cell: Element, index: number) => {
            const colIndex = index % columnCount;
            const cellContent = cell as HTMLElement;

            // Temporarily remove overflow to measure natural width
            const originalOverflow = cellContent.style.overflow;
            cellContent.style.overflow = 'visible';
            cellContent.style.whiteSpace = 'nowrap';

            const contentWidth = cellContent.scrollWidth;
            columnMeasurements[colIndex] = Math.max(columnMeasurements[colIndex], contentWidth);

            // Restore original styles
            cellContent.style.overflow = originalOverflow;
            cellContent.style.whiteSpace = '';
        });

        // Update grid with measured widths
        this.updateGridStylesWithMeasurements(columnMeasurements);
    }

    /**
     * Update grid styles based on measured content widths
     */
    private updateGridStylesWithMeasurements(columnMeasurements: number[]): void {
        const columnDefinitions = this.columns.map((col, index) => {
            // Priority 1: Column definition width settings (explicit overrides)
            if (col.width) return this.toUnitString(col.width);

            // Priority 2: Column has min/max constraints
            if (col.minWidth || col.maxWidth) {
                const min = col.minWidth ? this.toUnitString(col.minWidth) : 'min-content';
                const max = col.maxWidth ? this.toUnitString(col.maxWidth) : '1fr';
                return `minmax(${min}, ${max})`;
            }

            // Priority 3: Use measured content width, but constrain to min/max from config
            const measuredWidth = columnMeasurements[index];
            const minWidth = this.styleConfig?.columnMinWidth ?
                this.parsePixelValue(this.toUnitString(this.styleConfig.columnMinWidth)) : 100;
            const maxWidth = this.styleConfig?.columnMaxWidth ?
                this.parsePixelValue(this.toUnitString(this.styleConfig.columnMaxWidth)) : 400;

            const constrainedWidth = Math.max(minWidth, Math.min(maxWidth, measuredWidth));

            return `${constrainedWidth}px`;
        }).join(' ');

        // Update the grid styles with the new column definitions
        const styles: string[] = [`--kit-grid-columns: ${columnDefinitions}`];

        // Re-apply all other styles
        this.appendOtherGridStyles(styles);
    }

    /**
     * Parse pixel value from string like "100px"
     */
    private parsePixelValue(value: string): number {
        const match = value.match(/(\d+)/);
        return match ? parseInt(match[1], 10) : 100;
    }

    /**
     * Append non-column styles to the grid
     */
    private appendOtherGridStyles(styles: string[]): void {
        const config = this.styleConfig;

        // 1b. Dynamic Grid Row Generation
        let rowDefinition = 'auto';
        if (config?.rowHeight) {
            rowDefinition = this.toUnitString(config.rowHeight);
        } else if (config?.rowMinHeight || config?.rowMaxHeight) {
            const min = config.rowMinHeight ? this.toUnitString(config.rowMinHeight) : 'var(--kit-data-grid-row-min-height, auto)';
            const max = config.rowMaxHeight ? this.toUnitString(config.rowMaxHeight) : 'var(--kit-data-grid-row-max-height, auto)';
            rowDefinition = `minmax(${min}, ${max})`;
        } else {
            rowDefinition = 'minmax(var(--kit-data-grid-row-min-height, auto), var(--kit-data-grid-row-max-height, auto))';
        }
        styles.push(`--kit-grid-rows: ${rowDefinition}`);

        if (!config) {
            this.gridStyles = styles.join(';');
            return;
        }

        // 2. Grid Container Styling
        if (config.gridBackground) styles.push(`--kit-data-grid-background-color: ${config.gridBackground}`);
        if (config.gridBackgroundImage) styles.push(`--kit-data-grid-image-background: ${config.gridBackgroundImage}`);
        if (config.gridShadow) styles.push(`--kit-data-grid-shadow: ${config.gridShadow}`);
        if (config.gridBorderRadius) styles.push(`--kit-data-grid-border-radius: ${this.toUnitString(config.gridBorderRadius)}`);
        if (config.gridBorderColor) styles.push(`--kit-data-grid-border-color: ${config.gridBorderColor}`);
        if (config.gridBorderWidth) styles.push(`--kit-data-grid-border-width: ${this.toUnitString(config.gridBorderWidth)}`);

        // 3. Header Styling
        if (config.headerBackground) styles.push(`--kit-data-grid-header-background-color: ${config.headerBackground}`);
        if (config.headerBackgroundImage) styles.push(`--kit-data-grid-header-image-background: ${config.headerBackgroundImage}`);
        if (config.headerPaddingY) styles.push(`--kit-data-grid-header-padding-y: ${this.toUnitString(config.headerPaddingY)}`);
        if (config.headerPaddingX) styles.push(`--kit-data-grid-header-padding-x: ${this.toUnitString(config.headerPaddingX)}`);

        // 4. Column Styling (defaults for columns, can be overridden per-column)
        if (config.columnWidth) styles.push(`--kit-data-grid-column-width: ${this.toUnitString(config.columnWidth)}`);
        if (config.columnMinWidth) styles.push(`--kit-data-grid-column-min-width: ${this.toUnitString(config.columnMinWidth)}`);
        if (config.columnMaxWidth) styles.push(`--kit-data-grid-column-max-width: ${this.toUnitString(config.columnMaxWidth)}`);

        // 5. Row Styling
        if (config.rowHeight) styles.push(`--kit-data-grid-row-height: ${this.toUnitString(config.rowHeight)}`);
        if (config.rowMinHeight) styles.push(`--kit-data-grid-row-min-height: ${this.toUnitString(config.rowMinHeight)}`);
        if (config.rowMaxHeight) styles.push(`--kit-data-grid-row-max-height: ${this.toUnitString(config.rowMaxHeight)}`);
        if (config.rowBackground) styles.push(`--kit-data-grid-row-background-color: ${config.rowBackground}`);
        if (config.rowBackgroundImage) styles.push(`--kit-data-grid-row-image-background: ${config.rowBackgroundImage}`);
        if (config.rowAlternateBackground) styles.push(`--kit-data-grid-row-alternate-background-color: ${config.rowAlternateBackground}`);
        if (config.rowAlternateBackgroundImage) styles.push(`--kit-data-grid-row-alternate-image-background: ${config.rowAlternateBackgroundImage}`);
        if (config.rowHoverBackground) styles.push(`--kit-data-grid-row-hover-background-color: ${config.rowHoverBackground}`);
        if (config.rowHoverBackgroundImage) styles.push(`--kit-data-grid-row-hover-image-background: ${config.rowHoverBackgroundImage}`);
        if (config.rowSelectedBackground) styles.push(`--kit-data-grid-row-selected-background-color: ${config.rowSelectedBackground}`);
        if (config.rowSelectedBackgroundImage) styles.push(`--kit-data-grid-row-selected-image-background: ${config.rowSelectedBackgroundImage}`);

        // 6. Cell Styling
        if (config.cellPaddingY) styles.push(`--kit-data-grid-cell-padding-y: ${this.toUnitString(config.cellPaddingY)}`);
        if (config.cellPaddingX) styles.push(`--kit-data-grid-cell-padding-x: ${this.toUnitString(config.cellPaddingX)}`);

        this.gridStyles = styles.join(';');
    }

    private updateGridStyles(): void {
        const styles: string[] = [];
        const config = this.styleConfig;

        // 1. Dynamic Grid Column Generation
        // Hierarchy: Column definition > styleConfig > CSS variables (defaults)
        const columnDefinitions = this.columns.map(col => {
            // Priority 1: Column definition width settings
            if (col.width) return this.toUnitString(col.width);

            if (col.minWidth || col.maxWidth) {
                const min = col.minWidth ? this.toUnitString(col.minWidth) : 'min-content';
                const max = col.maxWidth ? this.toUnitString(col.maxWidth) : '1fr';
                return `minmax(${min}, ${max})`;
            }

            // Priority 2: styleConfig column settings
            if (config?.columnWidth) return this.toUnitString(config.columnWidth);

            if (config?.columnMinWidth || config?.columnMaxWidth) {
                const min = config.columnMinWidth ? this.toUnitString(config.columnMinWidth) : 'min-content';
                const max = config.columnMaxWidth ? this.toUnitString(config.columnMaxWidth) : '1fr';
                return `minmax(${min}, ${max})`;
            }

            // Priority 3: Use CSS variables with minmax so stylesheet min/max defaults apply
            return `minmax(var(--kit-data-grid-column-min-width, min-content), var(--kit-data-grid-column-max-width, 1fr))`;
        }).join(' ');

        styles.push(`--kit-grid-columns: ${columnDefinitions}`);

        // 1b. Dynamic Grid Row Generation (similar to columns)
        // Hierarchy: styleConfig > CSS variables (defaults)
        let rowDefinition = 'auto';
        if (config?.rowHeight) {
            // Priority 1: Direct height from config
            rowDefinition = this.toUnitString(config.rowHeight);
        } else if (config?.rowMinHeight || config?.rowMaxHeight) {
            // Priority 2: Min/max from config, fall back to CSS variables for unset values
            const min = config.rowMinHeight ? this.toUnitString(config.rowMinHeight) : 'var(--kit-data-grid-row-min-height, auto)';
            const max = config.rowMaxHeight ? this.toUnitString(config.rowMaxHeight) : 'var(--kit-data-grid-row-max-height, auto)';
            rowDefinition = `minmax(${min}, ${max})`;
        } else {
            // Priority 3: Use CSS variables so stylesheet defaults apply
            rowDefinition = 'minmax(var(--kit-data-grid-row-min-height, auto), var(--kit-data-grid-row-max-height, auto))';
        }
        styles.push(`--kit-grid-rows: ${rowDefinition}`);

        if (!config) {
            this.gridStyles = styles.join(';');
            return;
        }

        // 2. Grid Container Styling
        if (config.gridBackground) styles.push(`--kit-data-grid-background-color: ${config.gridBackground}`);
        if (config.gridBackgroundImage) styles.push(`--kit-data-grid-image-background: ${config.gridBackgroundImage}`);
        if (config.gridShadow) styles.push(`--kit-data-grid-shadow: ${config.gridShadow}`);
        if (config.gridBorderRadius) styles.push(`--kit-data-grid-border-radius: ${this.toUnitString(config.gridBorderRadius)}`);
        if (config.gridBorderColor) styles.push(`--kit-data-grid-border-color: ${config.gridBorderColor}`);
        if (config.gridBorderWidth) styles.push(`--kit-data-grid-border-width: ${this.toUnitString(config.gridBorderWidth)}`);

        // 3. Header Styling
        if (config.headerBackground) styles.push(`--kit-data-grid-header-background-color: ${config.headerBackground}`);
        if (config.headerBackgroundImage) styles.push(`--kit-data-grid-header-image-background: ${config.headerBackgroundImage}`);
        if (config.headerPaddingY) styles.push(`--kit-data-grid-header-padding-y: ${this.toUnitString(config.headerPaddingY)}`);
        if (config.headerPaddingX) styles.push(`--kit-data-grid-header-padding-x: ${this.toUnitString(config.headerPaddingX)}`);

        // 4. Column Styling (defaults for columns, can be overridden per-column)
        if (config.columnWidth) styles.push(`--kit-data-grid-column-width: ${this.toUnitString(config.columnWidth)}`);
        if (config.columnMinWidth) styles.push(`--kit-data-grid-column-min-width: ${this.toUnitString(config.columnMinWidth)}`);
        if (config.columnMaxWidth) styles.push(`--kit-data-grid-column-max-width: ${this.toUnitString(config.columnMaxWidth)}`);

        // 5. Row Styling
        if (config.rowHeight) styles.push(`--kit-data-grid-row-height: ${this.toUnitString(config.rowHeight)}`);
        if (config.rowMinHeight) styles.push(`--kit-data-grid-row-min-height: ${this.toUnitString(config.rowMinHeight)}`);
        if (config.rowMaxHeight) styles.push(`--kit-data-grid-row-max-height: ${this.toUnitString(config.rowMaxHeight)}`);
        if (config.rowBackground) styles.push(`--kit-data-grid-row-background-color: ${config.rowBackground}`);
        if (config.rowBackgroundImage) styles.push(`--kit-data-grid-row-image-background: ${config.rowBackgroundImage}`);
        if (config.rowAlternateBackground) styles.push(`--kit-data-grid-row-alternate-background-color: ${config.rowAlternateBackground}`);
        if (config.rowAlternateBackgroundImage) styles.push(`--kit-data-grid-row-alternate-image-background: ${config.rowAlternateBackgroundImage}`);
        if (config.rowHoverBackground) styles.push(`--kit-data-grid-row-hover-background-color: ${config.rowHoverBackground}`);
        if (config.rowHoverBackgroundImage) styles.push(`--kit-data-grid-row-hover-image-background: ${config.rowHoverBackgroundImage}`);
        if (config.rowSelectedBackground) styles.push(`--kit-data-grid-row-selected-background-color: ${config.rowSelectedBackground}`);
        if (config.rowSelectedBackgroundImage) styles.push(`--kit-data-grid-row-selected-image-background: ${config.rowSelectedBackgroundImage}`);

        // 6. Cell Styling
        if (config.cellPaddingY) styles.push(`--kit-data-grid-cell-padding-y: ${this.toUnitString(config.cellPaddingY)}`);
        if (config.cellPaddingX) styles.push(`--kit-data-grid-cell-padding-x: ${this.toUnitString(config.cellPaddingX)}`);

        this.gridStyles = styles.join(';');
    }

    private toUnitString(value: string | number): string {
        return typeof value === 'number' ? `${value}px` : value;
    }

    getFieldValue(row: T, field?: string | number | symbol): any {
        return field ? (row as any)?.[field] : undefined;
    }
}