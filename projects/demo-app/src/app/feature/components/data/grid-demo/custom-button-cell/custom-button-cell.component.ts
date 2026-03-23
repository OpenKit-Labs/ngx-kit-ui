import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KitButtonModule } from 'ngx-kit-ui';
import { KitDataGridV1CellRenderer } from '../../../../../../../../ngx-kit-ui/src/lib/components/data/grid/directives/cells/base-cell-renderer.directive';

/**
 * Custom button cell renderer for the data grid.
 * Renders a button in grid cells and emits click events.
 */
@Component({
    selector: 'app-custom-button-cell',
    standalone: true,
    templateUrl: './custom-button-cell.component.html',
    styleUrls: ['./custom-button-cell.component.scss'],
    imports: [CommonModule, KitButtonModule]
})
export class CustomButtonCellComponent extends KitDataGridV1CellRenderer {

    onButtonClick(): void {
        this.cellEvent.emit({
            row: this.row,
            column: this.column,
            value: this.value
        });


    }
}
