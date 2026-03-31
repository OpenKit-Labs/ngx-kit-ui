import { Component, Input } from '@angular/core';
import { KitDataGridCellRenderer } from '../../../models/renderers/kit-data-grid-cell-renderer.model';
import { KitTimeAgoPipe } from '../../../../../../pipes/time-ago/time-ago.pipe';

@Component({
    selector: 'kit-data-grid-time-ago-cell',
    standalone: true,
    imports: [KitTimeAgoPipe],
    templateUrl: './kit-data-grid-time-ago-cell-renderer.component.html',
    styleUrls: ['./kit-data-grid-time-ago-cell-renderer.component.scss']
})
export class KitDataGridTimeAgoCellRendererComponent implements KitDataGridCellRenderer {
    @Input() value!: any;
    @Input() row!: any;
    @Input() rowIndex!: number;
    @Input() config?: any;
}
