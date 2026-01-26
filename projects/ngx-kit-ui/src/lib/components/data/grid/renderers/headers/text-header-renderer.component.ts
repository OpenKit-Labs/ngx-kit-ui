import { Component } from '@angular/core';
import { KitDataGridHeaderRenderer } from '../../directives/headers/base-header-renderer.directive';
import { KitTextBodyComponent } from "../../../../text/text-body/text-body.component";

@Component({
    selector: 'kit-text-header-renderer',
    standalone: true,
    template: `<kit-text-body weight="bold">{{ header }}</kit-text-body>`,
    imports: [KitTextBodyComponent],
})
export class TextHeaderRendererComponent extends KitDataGridHeaderRenderer { }
