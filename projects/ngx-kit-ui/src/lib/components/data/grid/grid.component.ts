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
        const columnDefinitions = this.columns.map(col => {
            if (col.width) return this.toUnitString(col.width);
            if (col.minWidth || col.maxWidth) {
                const min = col.minWidth ? this.toUnitString(col.minWidth) : 'min-content';
                const max = col.maxWidth ? this.toUnitString(col.maxWidth) : '1fr';
                return `minmax(${min}, ${max})`;
            }
            return '1fr'; // Default flexible column
        }).join(' ');

        styles.push(`--kit-grid-columns: ${columnDefinitions}`);

        if (!config) {
            this.gridStyles = styles.join(';');
            return;
        }

        // 2. Grid Container Styling
        if (config.gridBackground) styles.push(`--kit-data-grid-background-color: ${config.gridBackground}`);
        if (config.gridImageBackground) styles.push(`--kit-data-grid-image-background: ${config.gridImageBackground}`);

        // 3. Row Styling
        if (config.rowHeight) styles.push(`--kit-data-grid-row-height: ${this.toUnitString(config.rowHeight)}`);
        if (config.rowBackground) styles.push(`--kit-data-grid-row-background-color: ${config.rowBackground}`);
        if (config.rowImageBackground) styles.push(`--kit-data-grid-row-image-background: ${config.rowImageBackground}`);
        if (config.rowAlternateBackground) styles.push(`--kit-data-grid-row-alternate-background-color: ${config.rowAlternateBackground}`);
        if (config.rowAlternateImageBackground) styles.push(`--kit-data-grid-row-alternate-image-background: ${config.rowAlternateImageBackground}`);
        if (config.rowHoverBackground) styles.push(`--kit-data-grid-row-hover-background-color: ${config.rowHoverBackground}`);
        if (config.rowHoverImageBackground) styles.push(`--kit-data-grid-row-hover-image-background: ${config.rowHoverImageBackground}`);

        // 4. Header Styling
        if (config.headerBackground) styles.push(`--kit-data-grid-header-background-color: ${config.headerBackground}`);
        if (config.headerImageBackground) styles.push(`--kit-data-grid-header-image-background: ${config.headerImageBackground}`);
        if (config.headerPaddingY) styles.push(`--kit-data-grid-header-padding-y: ${this.toUnitString(config.headerPaddingY)}`);
        if (config.headerPaddingX) styles.push(`--kit-data-grid-header-padding-x: ${this.toUnitString(config.headerPaddingX)}`);

        // 5. Cell Padding
        if (config.cellPaddingY) styles.push(`--kit-data-grid-cell-padding-y: ${this.toUnitString(config.cellPaddingY)}`);
        if (config.cellPaddingX) styles.push(`--kit-data-grid-cell-padding-x: ${this.toUnitString(config.cellPaddingX)}`);

        // 6. Border and Shadow
        if (config.borderColor) styles.push(`--kit-data-grid-border-color: ${config.borderColor}`);
        if (config.borderWidth) styles.push(`--kit-data-grid-border-width: ${this.toUnitString(config.borderWidth)}`);
        if (config.borderRadius) styles.push(`--kit-data-grid-border-radius: ${this.toUnitString(config.borderRadius)}`);
        if (config.shadow) styles.push(`--kit-data-grid-shadow: ${config.shadow}`);

        this.gridStyles = styles.join(';');
    }

    private toUnitString(value: string | number): string {
        return typeof value === 'number' ? `${value}px` : value;
    }

    getFieldValue(row: any, field?: string | number | symbol): any {
        return field ? row?.[field] : undefined;
    }
}