import { Component, Input, HostBinding, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KitDataGridColumn } from './grid-column.model';
import { GridStyleConfig } from './grid-style-config.model';
import { KitDataGridCellHostDirective } from './directives/cells/grid-cell-host.directive';
import { KitDataGridHeaderHostDirective } from './directives/headers/grid-header-host.directive';

@Component({
    selector: 'kit-data-grid',
    standalone: true,
    imports: [CommonModule, KitDataGridCellHostDirective, KitDataGridHeaderHostDirective],
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss'],
})
export class KitDataGridComponent implements OnInit, OnChanges {
    @Input() data: any[] = [];
    @Input() columns: KitDataGridColumn[] = [];
    @Input() styleConfig?: GridStyleConfig;

    @HostBinding('style') gridStyles: string = '';

    ngOnInit(): void {
        this.updateGridStyles();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.updateGridStyles();
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

            // Priority 3: Use CSS variables (via var() so it falls back to stylesheet defaults)
            return 'var(--kit-data-grid-column-width, 1fr)';
        }).join(' ');

        styles.push(`--kit-grid-columns: ${columnDefinitions}`);

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

    getFieldValue(row: any, field?: string | number | symbol): any {
        return field ? row?.[field] : undefined;
    }
}