import { Component, Input } from '@angular/core';
import { KitGridHeaderRenderer } from '../kit-grid-header-renderer';

@Component({
    selector: 'kit-grid-default-header',
    standalone: true,
    template: `{{ title }}`
})
export class KitGridDefaultHeaderRendererComponent implements KitGridHeaderRenderer {
    @Input() title!: string;
    @Input() config?: any;
}
