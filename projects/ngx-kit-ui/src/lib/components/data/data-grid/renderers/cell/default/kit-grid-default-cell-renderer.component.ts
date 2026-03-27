import { Component, Input } from '@angular/core';
import { KitGridCellRenderer } from '../kit-grid-cell-renderer';

@Component({
    selector: 'kit-grid-default-cell',
    standalone: true,
    templateUrl: './kit-grid-default-cell-renderer.component.html',
    styleUrls: ['./kit-grid-default-cell-renderer.component.scss']
})
export class KitGridDefaultCellRendererComponent implements KitGridCellRenderer {
    @Input() value!: any;
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
