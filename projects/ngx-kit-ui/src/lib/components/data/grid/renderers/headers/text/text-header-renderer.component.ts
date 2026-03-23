import { Component } from '@angular/core';
import { KitDataGridV1HeaderRenderer } from '../../../directives/headers/base-header-renderer.directive';
import { KitTextBodyComponent } from '../../../../../text/text-body/text-body.component';

@Component({
    selector: 'kit-text-header-renderer',
    standalone: true,
    imports: [KitTextBodyComponent],
    templateUrl: './text-header-renderer.component.html',
    styleUrls: ['./text-header-renderer.component.scss'],
})
export class KitDataGridV1TextHeaderRendererComponent extends KitDataGridV1HeaderRenderer { }
