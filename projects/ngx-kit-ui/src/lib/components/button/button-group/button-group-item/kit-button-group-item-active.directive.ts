import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[kitButtonGroupItemActive]'
})
export class KitButtonGroupItemActiveDirective {
    constructor(public template: TemplateRef<any>) { }
}
