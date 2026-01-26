import { Directive, Input, ViewContainerRef, OnInit, OnChanges, SimpleChanges, Injector } from '@angular/core';
import { KitDataGridColumn } from '../../grid-column.model';
import { KitDataGridHeaderRendererRegistry } from '../../services/headers/header-renderer-registry.service';

@Directive({
    selector: '[kitGridHeaderHost]',
    standalone: true
})
export class KitDataGridHeaderHostDirective implements OnInit, OnChanges {
    @Input() kitGridHeaderHost!: KitDataGridColumn;
    @Input() header!: string;

    constructor(
        private viewContainer: ViewContainerRef,
        private registry: KitDataGridHeaderRendererRegistry,
        private injector: Injector
    ) { }

    ngOnInit(): void {
        this.createRenderer();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['kitGridHeaderHost'] || changes['header']) {
            this.createRenderer();
        }
    }

    private createRenderer(): void {
        if (!this.kitGridHeaderHost) {
            return;
        }

        this.viewContainer.clear();
        const rendererType = this.registry.resolve(this.kitGridHeaderHost.headerType || 'text');
        const componentRef = this.viewContainer.createComponent(rendererType, { injector: this.injector });

        componentRef.instance.header = this.header;
        componentRef.instance.column = this.kitGridHeaderHost;
    }
}
