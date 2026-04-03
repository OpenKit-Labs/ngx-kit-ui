import {
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    NgZone,
    OnInit,
    OnChanges,
    Output,
    SimpleChanges,
    ViewChildren,
    ViewChild,
    QueryList,
    ViewContainerRef,
    ComponentRef,
    AfterViewInit,
    OnDestroy,
    ChangeDetectionStrategy,
    ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { KitDataGridDataSource } from '../models/data-source/kit-data-grid-data-source.model';
import { KitDataGridColumnConfig } from '../models/config/kit-data-grid-column-config.model';
import { KitDataGridQuery } from '../models/data-source/kit-data-grid-query.model';
import { KitDataGridResult } from '../models/data-source/kit-data-grid-result.model';
import { KitDataGridConfig } from '../models/config/kit-data-grid-config.model';
import { KitDataGridCellRenderer } from '../models/renderers/kit-data-grid-cell-renderer.model';
import { KitDataGridHeaderRenderer } from '../models/renderers/kit-data-grid-header-renderer';
import { KitDataGridFooterRenderer } from '../models/renderers/kit-data-grid-footer-renderer.model';
import { KitDataGridRowClickEvent, KitDataGridCellActionEvent } from '../models/kit-data-grid-events.model';
import { KitDataGridDefaultCellRendererComponent } from '../renderers/cell/default/kit-data-grid-default-cell-renderer.component';
import { KitDataGridDefaultHeaderRendererComponent } from '../renderers/header/default/kit-data-grid-default-header-renderer.component';
import { KitDataGridDefaultFooterRendererComponent } from '../renderers/footer/default/kit-data-grid-default-footer-renderer.component';

const DEFAULT_COL_MIN_PX = 199;
const DEFAULT_ROW_MIN_PX = 199;
const DEFAULT_ROW_MAX_PX = 199;

@Component({
    selector: 'kit-data-grid',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './kit-data-grid.component.html',
    styleUrls: ['./kit-data-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class KitDataGridComponent<T = any> implements OnInit, OnChanges, AfterViewInit, OnDestroy {

    @Input() dataSource!: KitDataGridDataSource<T>;
    @Input() config!: KitDataGridConfig<T>;

    @Output() queryChange = new EventEmitter<KitDataGridQuery>();
    @Output() rowClick = new EventEmitter<KitDataGridRowClickEvent<T>>();
    @Output() cellAction = new EventEmitter<KitDataGridCellActionEvent<T>>();

    protected get columns(): KitDataGridColumnConfig<T>[] { return this.config?.columns ?? []; }

    @ViewChildren('headerCell', { read: ViewContainerRef })
    headerCells!: QueryList<ViewContainerRef>;

    @ViewChildren('dataCell', { read: ViewContainerRef })
    dataCells!: QueryList<ViewContainerRef>;

    @ViewChild('footerCell', { read: ViewContainerRef, static: false })
    footerCell?: ViewContainerRef;

    result: KitDataGridResult<T> = { data: [], total: 0 };
    currentQuery: KitDataGridQuery = { page: 0, pageSize: 50 };

    private headerRefs: ComponentRef<any>[] = [];
    private cellRefs: ComponentRef<any>[] = [];
    private footerRef: ComponentRef<any> | null = null;

    viewportHeight: number | null = null;
    private viewportObserver: ResizeObserver | null = null;

    constructor(
        private cdr: ChangeDetectorRef,
        private el: ElementRef<HTMLElement>,
        private zone: NgZone
    ) { }

    // ── Lifecycle ─────────────────────────────────────────────────────────────

    ngOnInit(): void {
        if (this.dataSource) {
            this.dataSource.init(this.currentQuery).then(r => this.setResult(r));
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ((changes['dataSource'] || changes['config']) && !changes['dataSource']?.firstChange) {
            this.reload();
        }
    }

    ngAfterViewInit(): void {
        this.renderHeaders();
        this.renderFooter();
        this.headerCells.changes.subscribe(() => this.renderHeaders());
        this.dataCells.changes.subscribe(() => this.renderCells());
        this.setupViewportMode();
    }

    ngOnDestroy(): void {
        this.destroyRefs(this.headerRefs);
        this.destroyRefs(this.cellRefs);
        this.footerRef?.destroy();
        this.viewportObserver?.disconnect();
    }

    // ── Public helpers used by template ──────────────────────────────────────

    @HostBinding('class.kit-data-grid-host-flex')
    get isFlexMode(): boolean {
        return (this.config?.height ?? 'flex') === 'flex';
    }

    get heightMode(): 'flex' | 'viewport' | 'auto' | 'fixed' {
        const h = this.config?.height ?? 'flex';
        if (h === 'auto') return 'auto';
        if (h === 'flex') return 'flex';
        if (h === 'viewport') return 'viewport';
        return 'fixed';
    }

    get outerHeight(): string | null {
        const h = this.config?.height ?? 'flex';
        if (typeof h === 'number') return `${h}px`;
        if (h === 'viewport' && this.viewportHeight != null) return `${this.viewportHeight}px`;
        return null;
    }

    get gridTemplateColumns(): string {
        return this.columns.map(col => this.resolveColWidth(col)).join(' ');
    }

    get rowStyle(): Record<string, string> {
        const row = this.config?.rows;
        if (row?.height != null) {
            return { height: `${row.height}px`, 'min-height': `${row.height}px`, 'max-height': `${row.height}px` };
        }
        const min = row?.minHeight ?? DEFAULT_ROW_MIN_PX;
        const max = Math.max(row?.maxHeight ?? DEFAULT_ROW_MAX_PX, min);
        return { 'min-height': `${min}px`, 'max-height': `${max}px` };
    }

    onRowClick(row: T, rowIndex: number, event: MouseEvent): void {
        this.rowClick.emit({ row, rowIndex, event });
    }

    // ── Private ───────────────────────────────────────────────────────────────

    private setupViewportMode(): void {
        if (this.config?.height !== 'viewport') return;

        const measure = () => {
            const top = this.el.nativeElement.getBoundingClientRect().top;
            const height = Math.max(0, window.innerHeight - top);
            if (height !== this.viewportHeight) {
                this.viewportHeight = height;
                this.cdr.markForCheck();
            }
        };

        // Re-measure on window resize outside Angular zone to avoid excessive CD
        this.zone.runOutsideAngular(() => {
            const onResize = () => this.zone.run(measure);
            window.addEventListener('resize', onResize);
            // Store cleanup on the observer slot for ngOnDestroy
            this.viewportObserver = { disconnect: () => window.removeEventListener('resize', onResize) } as any;
        });

        measure();
    }

    private async reload(): Promise<void> {
        if (!this.dataSource) return;
        const r = await this.dataSource.queryChange(this.currentQuery);
        this.setResult(r);
    }

    private setResult(r: KitDataGridResult<T>): void {
        this.result = r;

        // Update cell renderers in-place — avoids relying on dataCells.changes
        // which only fires when the number of rows changes, not when data changes
        const colCount = this.columns.length;
        if (this.cellRefs.length === r.data.length * colCount) {
            this.cellRefs.forEach((ref, idx) => {
                const colIdx = idx % colCount;
                const rowIdx = Math.floor(idx / colCount);
                const col = this.columns[colIdx];
                const row = r.data[rowIdx];
                ref.instance.value = row ? this.getFieldValue(row, col.field as string) : undefined;
                ref.instance.row = row;
                ref.instance.rowIndex = rowIdx;
                ref.changeDetectorRef.detectChanges();
            });
        }

        // Push updated query state to all header refs
        this.headerRefs.forEach(ref => {
            ref.instance.query = this.currentQuery;
            ref.changeDetectorRef.detectChanges();
        });

        if (this.footerRef) {
            this.footerRef.instance.result = r;
            this.footerRef.instance.query = this.currentQuery;
            this.footerRef.changeDetectorRef.detectChanges();
        }
        this.cdr.markForCheck();
    }

    private readonly onHeaderQueryChange = async (query: KitDataGridQuery): Promise<void> => {
        if (!this.dataSource) return;
        const r = await this.dataSource.queryChange(query);
        this.currentQuery = query;
        this.queryChange.emit(query);
        this.setResult(r);
    };

    private readonly onFooterQueryChange = async (query: KitDataGridQuery): Promise<void> => {
        if (!this.dataSource) return;
        const r = await this.dataSource.queryChange(query);
        this.currentQuery = query;
        this.queryChange.emit(query);
        this.setResult(r);
    };

    private resolveColWidth(col: KitDataGridColumnConfig<T>): string {
        const merged = col;

        if (merged.absoluteWidth != null) {
            // Base → apply minWidth as floor, maxWidth as ceiling → fixed px, no stretch
            let size = merged.absoluteWidth;
            if (merged.minWidth != null) size = Math.max(size, merged.minWidth);
            if (merged.maxWidth != null) size = Math.min(size, merged.maxWidth);
            return `${size}px`;
        }

        // Flexible column: stretches with 1fr, bounded by min/maxWidth
        const min = merged.minWidth ?? DEFAULT_COL_MIN_PX;
        const max = merged.maxWidth != null ? `${merged.maxWidth}px` : '1fr';
        return `minmax(${min}px, ${max})`;
    }

    // ── Dynamic renderer creation ─────────────────────────────────────────────

    private renderHeaders(): void {
        if (!this.headerCells) return;
        this.destroyRefs(this.headerRefs);
        this.headerRefs = [];

        this.headerCells.forEach((vcr, i) => {
            vcr.clear();
            const col = this.columns[i];
            const { component, config } = col.headerRenderer ?? { component: KitDataGridDefaultHeaderRendererComponent };
            const ref = vcr.createComponent<KitDataGridHeaderRenderer>(component);
            ref.instance.title = col.title;
            ref.instance.field = col.field as string;
            ref.instance.query = this.currentQuery;
            ref.instance.onQueryChange = this.onHeaderQueryChange;
            ref.instance.config = config;
            ref.changeDetectorRef.detectChanges();
            this.headerRefs.push(ref);
        });
    }

    private renderCells(): void {
        if (!this.dataCells) return;
        this.destroyRefs(this.cellRefs);
        this.cellRefs = [];

        const colCount = this.columns.length;

        this.dataCells.forEach((vcr, idx) => {
            vcr.clear();
            const colIdx = idx % colCount;
            const rowIdx = Math.floor(idx / colCount);
            const col = this.columns[colIdx];
            const row = this.result.data[rowIdx];
            const { component, config } = col.cellRenderer ?? { component: KitDataGridDefaultCellRendererComponent };
            const ref = vcr.createComponent<KitDataGridCellRenderer>(component);
            ref.instance.value = row ? this.getFieldValue(row, col.field as string) : undefined;
            ref.instance.row = row;
            ref.instance.rowIndex = rowIdx;
            ref.instance.config = config;
            if (ref.instance.action) {
                ref.instance.action.subscribe((payload) =>
                    this.cellAction.emit({ row, rowIndex: rowIdx, column: col, payload })
                );
            }
            ref.changeDetectorRef.detectChanges();
            this.cellRefs.push(ref);
        });
    }

    private renderFooter(): void {
        if (!this.footerCell) return;
        this.footerRef?.destroy();
        this.footerCell.clear();
        const footerConfig = this.config?.footer;
        const renderer = footerConfig?.renderer ?? KitDataGridDefaultFooterRendererComponent;
        const config = footerConfig?.config;
        const ref = this.footerCell.createComponent<KitDataGridFooterRenderer>(renderer);
        ref.instance.result = this.result;
        ref.instance.query = this.currentQuery;
        ref.instance.onQueryChange = this.onFooterQueryChange;
        ref.instance.config = config;
        ref.changeDetectorRef.detectChanges();
        this.footerRef = ref;
    }

    private getFieldValue(row: any, field: string): any {
        return field.split('.').reduce((obj, key) => obj != null ? obj[key] : undefined, row);
    }

    private destroyRefs(refs: ComponentRef<any>[]): void {
        refs.forEach(r => r.destroy());
        refs.length = 0;
    }
}
