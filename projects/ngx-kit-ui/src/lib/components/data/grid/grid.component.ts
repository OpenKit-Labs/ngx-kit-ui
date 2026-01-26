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

        // 2. Existing Style Mapping (Abbreviated for clarity, keep your existing mapping logic here)
        if (config.gridBackground) styles.push(`--kit-data-grid-background-color: ${config.gridBackground}`);
        if (config.rowHeight) styles.push(`--kit-data-grid-row-height: ${this.toUnitString(config.rowHeight)}`);
        if (config.rowBackground) styles.push(`--kit-data-grid-row-background-color: ${config.rowBackground}`);
        if (config.headerBackground) styles.push(`--kit-data-grid-header-background-color: ${config.headerBackground}`);
        // ... (Keep the rest of your mapping logic from the original file)

        this.gridStyles = styles.join(';');
    }

    private toUnitString(value: string | number): string {
        return typeof value === 'number' ? `${value}px` : value;
    }

    getFieldValue(row: any, field?: string | number | symbol): any {
        return field ? row?.[field] : undefined;
    }
}