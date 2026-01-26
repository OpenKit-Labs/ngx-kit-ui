import { Directive, Input, ViewContainerRef, OnInit, OnChanges, SimpleChanges, Injector } from '@angular/core';
import { KitDataGridColumn } from '../../grid-column.model';
import { KitDataGridCellRendererRegistry } from '../../services/cells/cell-renderer-registry.service';

@Directive({
    selector: '[kitGridCellHost]',
    standalone: true
})
export class KitDataGridCellHostDirective implements OnInit, OnChanges {
    @Input() kitGridCellHost!: KitDataGridColumn;
    @Input() value: any;
    @Input() row: any;
    @Input() params: any;

    constructor(
        private viewContainer: ViewContainerRef,
        private registry: KitDataGridCellRendererRegistry,
        private injector: Injector
    ) { }

    ngOnInit(): void {
        this.createRenderer();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['kitGridCellHost'] || changes['value'] || changes['row'] || changes['params']) {
            this.createRenderer();
        }
    }

    private createRenderer(): void {
        if (!this.kitGridCellHost) {
            return;
        }

        this.viewContainer.clear();
        const rendererType = this.registry.resolve(this.kitGridCellHost.type);
        const componentRef = this.viewContainer.createComponent(rendererType, { injector: this.injector });

        componentRef.instance.value = this.value;
        componentRef.instance.row = this.row;
        componentRef.instance.column = this.kitGridCellHost;
        componentRef.instance.params = this.params;
    }
}
