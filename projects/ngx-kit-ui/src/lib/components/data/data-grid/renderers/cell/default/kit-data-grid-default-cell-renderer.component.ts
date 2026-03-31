import { Component, Input } from '@angular/core';
import { KitDataGridCellRenderer } from '../../../models/renderers/kit-data-grid-cell-renderer.model';

@Component({
    selector: 'kit-data-grid-default-cell',
    standalone: true,
    templateUrl: './kit-data-grid-default-cell-renderer.component.html',
    styleUrls: ['./kit-data-grid-default-cell-renderer.component.scss']
})
export class KitDataGridDefaultCellRendererComponent implements KitDataGridCellRenderer {
    @Input() value!: any;
    @Input() row!: any;
    @Input() rowIndex!: number;
    @Input() config?: any;

    get displayValue(): string {
        if (this.value == null || this.value === undefined) {
            return '';
        }
        if (typeof this.value === 'object') {
            return JSON.stringify(this.value);
        }
        return String(this.value);
    }
}
