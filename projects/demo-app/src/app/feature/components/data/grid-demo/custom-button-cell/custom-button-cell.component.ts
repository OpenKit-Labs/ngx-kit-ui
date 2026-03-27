import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KitButtonModule } from 'ngx-kit-ui';
import { KitGridCellRenderer, kitCellRenderer } from '../../../../../../../../ngx-kit-ui/src/public-api';

export interface CustomButtonCellConfig {
    color?: 'primary' | 'secondary';
}

@Component({
    selector: 'app-custom-button-cell',
    standalone: true,
    templateUrl: './custom-button-cell.component.html',
    styleUrls: ['./custom-button-cell.component.scss'],
    imports: [CommonModule, KitButtonModule]
})
export class CustomButtonCellComponent implements KitGridCellRenderer<any, CustomButtonCellConfig> {
    @Input() value!: any;
    @Input() config?: CustomButtonCellConfig;

    onButtonClick(): void {
        console.log('cell clicked', this.value);
    }
}
