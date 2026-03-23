import { Component } from '@angular/core';
import { KitDataGridV1CellRenderer } from '../../../directives/cells/base-cell-renderer.directive';
import { KitTextBodyComponent } from '../../../../../text/text-body/text-body.component';

@Component({
    selector: 'kit-text-cell-renderer',
    standalone: true,
    templateUrl: './text-cell-renderer.component.html',
    styleUrls: ['./text-cell-renderer.component.scss'],
    imports: [KitTextBodyComponent]
})
export class KitDataGridV1TextCellRendererComponent extends KitDataGridV1CellRenderer { }
