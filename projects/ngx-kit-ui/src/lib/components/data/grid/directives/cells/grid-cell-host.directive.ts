import { Directive, Input, ViewContainerRef, OnInit, OnChanges, SimpleChanges, Injector, Output, EventEmitter, OnDestroy } from '@angular/core';
import { KitDataGridColumn } from '../../grid-column.model';
import { KitDataGridCellRendererRegistry } from '../../services/cells/cell-renderer-registry.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { KitDataGridCellEvent } from '../../models/cell-event.model';

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
export class KitDataGridCellHostDirective<T = any> implements OnInit, OnChanges, OnDestroy {
    @Input() kitGridCellHost!: KitDataGridColumn<T>;
    @Input() value: any;
    @Input() row!: T;
    @Input() params: any;

    /**
     * Re-emits strongly typed cell events from the renderer.
     * Parent components should subscribe to this to handle cell actions.
     */
    @Output() cellEvent = new EventEmitter<KitDataGridCellEvent<T>>();

    private destroy$ = new Subject<void>();

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
                .subscribe((event: KitDataGridCellEvent<T>) => {
                    this.cellEvent.emit(event);
                });
        }
    }
}
