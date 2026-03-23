import { Component, Input } from '@angular/core';
import { KitGridFooterRenderer } from '../kit-grid-footer-renderer';

@Component({
    selector: 'kit-grid-default-footer',
    standalone: true,
    template: `{{ value }}`
})
export class KitGridDefaultFooterRendererComponent implements KitGridFooterRenderer {
    @Input() value!: any;
    @Input() config?: any;
}
