import { Directive, Input, ViewContainerRef, OnInit, OnChanges, SimpleChanges, Injector, Output, EventEmitter, OnDestroy } from '@angular/core';
import { KitDataGridV1Column } from '../../grid-column.model';
import { KitDataGridV1CellRendererRegistry } from '../../services/cells/cell-renderer-registry.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { KitDataGridV1CellEvent } from '../../models/cell-event.model';

/**
 * Host directive that dynamically instantiates cell renderers and manages their event emissions.
 * 
 * Re-emits cellEvent from the renderer to allow parent components to listen
 * to strongly typed cell action events from the grid.
 * 
 * @template T - The type of data in the grid row
 */
@Directive({
    selector: '[kitGridCellHost]',
    standalone: true
})
export class KitDataGridV1CellHostDirective<T = any> implements OnInit, OnChanges, OnDestroy {
    @Input() kitGridCellHost!: KitDataGridV1Column<T>;
    @Input() value: any;
    @Input() row!: T;
    @Input() params: any;

    /**
     * Re-emits strongly typed cell events from the renderer.
     * Parent components should subscribe to this to handle cell actions.
     */
    @Output() cellEvent = new EventEmitter<KitDataGridV1CellEvent<T>>();

    private destroy$ = new Subject<void>();

    constructor(
        private viewContainer: ViewContainerRef,
        private registry: KitDataGridV1CellRendererRegistry,
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

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private createRenderer(): void {
        if (!this.kitGridCellHost) {
            return;
        }

        this.viewContainer.clear();
        const rendererType = this.registry.resolve(this.kitGridCellHost.type);
        const componentRef = this.viewContainer.createComponent(rendererType, { injector: this.injector });

        const renderer = componentRef.instance as any;
        renderer.value = this.value;
        renderer.row = this.row;
        renderer.column = this.kitGridCellHost;
        renderer.params = this.params;

        // Subscribe to renderer's cellEvent and re-emit
        if (renderer.cellEvent) {
            renderer.cellEvent
                .pipe(takeUntil(this.destroy$))
                .subscribe((event: KitDataGridV1CellEvent<T>) => {
                    this.cellEvent.emit(event);
                });
        }
    }
}
