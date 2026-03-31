import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KitButtonModule } from 'ngx-kit-ui';
import { KitDataGridCellRenderer } from '../../../../../../../../ngx-kit-ui/src/public-api';

export interface CustomButtonCellConfig {
    color?: 'primary' | 'secondary';
}

export type CustomButtonCellAction =
    | { type: 'view'; row: any }
    | { type: 'delete'; row: any };

@Component({
    selector: 'app-custom-button-cell',
    standalone: true,
    templateUrl: './custom-button-cell.component.html',
    styleUrls: ['./custom-button-cell.component.scss'],
    imports: [CommonModule, KitButtonModule]
})
export class CustomButtonCellComponent implements KitDataGridCellRenderer<string, CustomButtonCellConfig> {
    @Input() value!: string;
    @Input() row!: any;
    @Input() rowIndex!: number;
    @Input() config?: CustomButtonCellConfig;
    @Output() action = new EventEmitter<CustomButtonCellAction>();

    onViewClick(): void {
        this.action.emit({ type: 'view', row: this.row });
    }

    onDeleteClick(): void {
        this.action.emit({ type: 'delete', row: this.row });
    }
}
