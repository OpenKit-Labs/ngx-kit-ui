import { Component, Input } from '@angular/core';
import { KitGridCellRenderer } from '../kit-grid-cell-renderer';

@Component({
    selector: 'kit-grid-default-cell',
    standalone: true,
    template: `{{ value }}`
})
export class KitGridDefaultCellRendererComponent implements KitGridCellRenderer {
    @Input() value!: any;
    @Input() config?: any;
}
