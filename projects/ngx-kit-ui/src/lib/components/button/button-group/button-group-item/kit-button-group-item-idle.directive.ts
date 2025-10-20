import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[kitButtonGroupItemIdle]'
})
export class KitButtonGroupItemIdleDirective {
    constructor(public template: TemplateRef<any>) { }
}
