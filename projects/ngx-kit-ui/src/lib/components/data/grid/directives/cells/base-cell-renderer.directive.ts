import { Directive, Input } from '@angular/core';

@Directive()
export abstract class KitDataGridCellRenderer {
    @Input() value: any;
    @Input() row: any;
    @Input() column: any;
}
