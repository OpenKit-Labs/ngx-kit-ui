import { Directive, Input, ViewContainerRef, OnInit, OnChanges, SimpleChanges, Injector, Output, EventEmitter, OnDestroy } from '@angular/core';
import { KitDataGridV1Column } from '../../grid-column.model';
import { KitDataGridV1HeaderRendererRegistry } from '../../services/headers/header-renderer-registry.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { KitDataGridV1HeaderEvent } from '../../models/header-event.model';

/**
 * Host directive that dynamically instantiates header renderers and manages their event emissions.
 * 
 * Re-emits action events from the renderer to allow parent components to listen
 * to strongly typed header action events from the grid.
 * 
 * @template T - The type of data in the grid row
 */
@Directive({
    selector: '[kitGridHeaderHost]',
    standalone: true
})
export class KitDataGridV1HeaderHostDirective<T = any> implements OnInit, OnChanges, OnDestroy {
    @Input() kitGridHeaderHost!: KitDataGridV1Column<T>;
    @Input() header!: string;

    /**
     * Re-emits strongly typed header action events from the renderer.
     * Parent components should subscribe to this to handle header actions.
     */
    @Output() headerAction = new EventEmitter<KitDataGridV1HeaderEvent<T>>();

    private destroy$ = new Subject<void>();

    constructor(
        private viewContainer: ViewContainerRef,
        private registry: KitDataGridV1HeaderRendererRegistry,
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

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private createRenderer(): void {
        if (!this.kitGridHeaderHost) {
            return;
        }

        this.viewContainer.clear();
        const rendererType = this.registry.resolve(this.kitGridHeaderHost.headerType || 'text');
        const componentRef = this.viewContainer.createComponent(rendererType, { injector: this.injector });

        const renderer = componentRef.instance as any;
        renderer.header = this.header;
        renderer.column = this.kitGridHeaderHost;

        // Subscribe to renderer's action event and re-emit as headerAction
        if (renderer.action) {
            renderer.action
                .pipe(takeUntil(this.destroy$))
                .subscribe((event: KitDataGridV1HeaderEvent<T>) => {
                    this.headerAction.emit(event);
                });
        }
    }
}
