import { Directive, Input } from '@angular/core';

@Directive()
export abstract class KitDataGridHeaderRenderer {
    @Input() header!: string;
    @Input() column: any;
}
