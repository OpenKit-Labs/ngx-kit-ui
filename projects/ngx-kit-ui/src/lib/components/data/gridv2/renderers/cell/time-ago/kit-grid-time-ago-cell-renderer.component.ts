import { Component, Input } from '@angular/core';
import { KitGridCellRenderer } from '../kit-grid-cell-renderer';
import { KitTimeAgoPipe } from '../../../../../../pipes/time-ago/time-ago.pipe';

@Component({
    selector: 'kit-grid-time-ago-cell',
    standalone: true,
    imports: [KitTimeAgoPipe],
    templateUrl: './kit-grid-time-ago-cell-renderer.component.html',
    styleUrls: ['./kit-grid-time-ago-cell-renderer.component.scss']
})
export class KitGridTimeAgoCellRendererComponent implements KitGridCellRenderer {
    @Input() value!: any;
    @Input() config?: any;
}
