import { Component, Input, HostBinding, OnInit } from '@angular/core';
import { KitDataGridColumn } from './grid-column.model';
import { GridStyleConfig } from './grid-style-config.model';
import { KitDataGridCellHostDirective } from './directives/cells/grid-cell-host.directive';
import { KitDataGridHeaderHostDirective } from './directives/headers/grid-header-host.directive';

@Component({
    selector: 'kit-data-grid',
    standalone: true,
    imports: [KitDataGridCellHostDirective, KitDataGridHeaderHostDirective],
    templateUrl: './grid.component.html',
    styleUrl: './grid.component.scss',
})
export class KitDataGridComponent implements OnInit {
    @Input() data: any[] = [];
    @Input() columns: KitDataGridColumn[] = [];

    /**
     * Optional per-grid styling configuration.
     * All properties fall back to base stylesheet defaults when undefined.
     */
    @Input() styleConfig?: GridStyleConfig;

    /**
     * Dynamically computed inline styles based on styleConfig.
     * These are applied to the grid container via HostBinding.
     */
    @HostBinding('style') gridStyles: string = '';

    ngOnInit(): void {
        this.updateGridStyles();
    }

    ngOnChanges(): void {
        this.updateGridStyles();
    }

    /**
     * Map styleConfig properties to CSS custom properties (variables).
     * This maintains a clean separation: config → variables → styles.
     */
    private updateGridStyles(): void {
        if (!this.styleConfig) {
            // Reset to base defaults if no config provided
            this.gridStyles = '';
            return;
        }

        const styles: string[] = [];
        const config = this.styleConfig;

        // Container background
        if (config.gridBackground !== undefined) {
            styles.push(`--kit-data-grid-background-color: ${config.gridBackground}`);
        }

        // Density is handled by global theme variables; per-grid density
        // is intentionally not supported in the config to preserve
        // consistent spacing across the app.

        // Row dimensions
        if (config.rowHeight !== undefined) {
            styles.push(`--kit-data-grid-row-height: ${this.toUnitString(config.rowHeight)}`);
        }
        if (config.rowMinHeight !== undefined) {
            styles.push(`--kit-data-grid-row-min-height: ${this.toUnitString(config.rowMinHeight)}`);
        }
        if (config.rowMaxHeight !== undefined) {
            styles.push(`--kit-data-grid-row-max-height: ${this.toUnitString(config.rowMaxHeight)}`);
        }

        // Row backgrounds — support separate color and image/gradient vars.
        const isImageLike = (v: any) => typeof v === 'string' && /(gradient|url\()/i.test(v);

        if (config.rowBackground !== undefined) {
            if (isImageLike(config.rowBackground)) {
                styles.push(`--kit-data-grid-row-background-image: ${config.rowBackground}`);
                styles.push(`--kit-data-grid-row-background-color: transparent`);
            } else {
                styles.push(`--kit-data-grid-row-background-color: ${config.rowBackground}`);
                styles.push(`--kit-data-grid-row-background-image: none`);
            }
        }
        if (config.rowBackgroundImage !== undefined) {
            styles.push(`--kit-data-grid-row-background-image: ${config.rowBackgroundImage}`);
        }
        if (config.rowAlternateBackground !== undefined) {
            if (isImageLike(config.rowAlternateBackground)) {
                styles.push(`--kit-data-grid-row-alternate-background-image: ${config.rowAlternateBackground}`);
                styles.push(`--kit-data-grid-row-alternate-background-color: transparent`);
            } else {
                styles.push(`--kit-data-grid-row-alternate-background-color: ${config.rowAlternateBackground}`);
                styles.push(`--kit-data-grid-row-alternate-background-image: none`);
            }
        }
        if (config.rowAlternateBackgroundImage !== undefined) {
            styles.push(`--kit-data-grid-row-alternate-background-image: ${config.rowAlternateBackgroundImage}`);
        }
        if (config.rowHoverBackground !== undefined) {
            if (isImageLike(config.rowHoverBackground)) {
                styles.push(`--kit-data-grid-row-hover-background-image: ${config.rowHoverBackground}`);
                styles.push(`--kit-data-grid-row-hover-background-color: transparent`);
            } else {
                styles.push(`--kit-data-grid-row-hover-background-color: ${config.rowHoverBackground}`);
                styles.push(`--kit-data-grid-row-hover-background-image: none`);
            }
        }
        if (config.rowHoverBackgroundImage !== undefined) {
            styles.push(`--kit-data-grid-row-hover-background-image: ${config.rowHoverBackgroundImage}`);
        }
        if (config.rowSelectedBackground !== undefined) {
            if (isImageLike(config.rowSelectedBackground)) {
                styles.push(`--kit-data-grid-row-selected-background-image: ${config.rowSelectedBackground}`);
                styles.push(`--kit-data-grid-row-selected-background-color: transparent`);
            } else {
                styles.push(`--kit-data-grid-row-selected-background-color: ${config.rowSelectedBackground}`);
                styles.push(`--kit-data-grid-row-selected-background-image: none`);
            }
        }
        if (config.rowSelectedBackgroundImage !== undefined) {
            styles.push(`--kit-data-grid-row-selected-background-image: ${config.rowSelectedBackgroundImage}`);
        }

        // Header styling
        if (config.headerBackground !== undefined) {
            if (isImageLike(config.headerBackground)) {
                styles.push(`--kit-data-grid-header-background-image: ${config.headerBackground}`);
                styles.push(`--kit-data-grid-header-background-color: transparent`);
            } else {
                styles.push(`--kit-data-grid-header-background-color: ${config.headerBackground}`);
                styles.push(`--kit-data-grid-header-background-image: none`);
            }
        }
        if (config.headerBackgroundImage !== undefined) {
            styles.push(`--kit-data-grid-header-background-image: ${config.headerBackgroundImage}`);
        }
        if (config.headerPaddingY !== undefined) {
            styles.push(`--kit-data-grid-header-padding-y: ${this.toUnitString(config.headerPaddingY)}`);
        }
        if (config.headerPaddingX !== undefined) {
            styles.push(`--kit-data-grid-header-padding-x: ${this.toUnitString(config.headerPaddingX)}`);
        }

        // Cell padding
        if (config.cellPaddingY !== undefined) {
            styles.push(`--kit-data-grid-cell-padding-y: ${this.toUnitString(config.cellPaddingY)}`);
        }
        if (config.cellPaddingX !== undefined) {
            styles.push(`--kit-data-grid-cell-padding-x: ${this.toUnitString(config.cellPaddingX)}`);
        }

        // Cell dimensions
        if (config.cellWidth !== undefined) {
            styles.push(`--kit-data-grid-cell-width: ${this.toUnitString(config.cellWidth)}`);
        }
        if (config.cellMinWidth !== undefined) {
            styles.push(`--kit-data-grid-cell-min-width: ${this.toUnitString(config.cellMinWidth)}`);
        }
        if (config.cellMaxWidth !== undefined) {
            styles.push(`--kit-data-grid-cell-max-width: ${this.toUnitString(config.cellMaxWidth)}`);
        }

        // Borders and spacing
        if (config.borderColor !== undefined) {
            styles.push(`--kit-data-grid-border-color: ${config.borderColor}`);
        }
        if (config.borderWidth !== undefined) {
            styles.push(`--kit-data-grid-border-width: ${this.toUnitString(config.borderWidth)}`);
        }
        if (config.borderRadius !== undefined) {
            styles.push(`--kit-data-grid-border-radius: ${this.toUnitString(config.borderRadius)}`);
        }

        // Visual effects
        if (config.shadow !== undefined) {
            styles.push(`--kit-data-grid-shadow: ${config.shadow}`);
        }

        // Font size and line-height are managed globally via theme variables.

        this.gridStyles = styles.join(';');
    }

    /**
     * Convert number to px string, keep string as-is.
     * Handles both pure numbers and strings with units.
     */
    private toUnitString(value: string | number): string {
        if (typeof value === 'number') {
            return `${value}px`;
        }
        return value;
    }

    getFieldValue(row: any, field?: string | number | symbol): any {
        if (!field) {
            return undefined;
        }
        return row?.[field];
    }
}
