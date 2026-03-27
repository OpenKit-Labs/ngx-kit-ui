import {
    Component,
    ElementRef,
    HostBinding,
    Input,
    NgZone,
    OnInit,
    OnChanges,
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

import { KitGridDataSource } from '../models/kit-grid-data-source.model';
import { KitGridColumn } from '../models/kit-grid-column.model';
import { KitGridQuery } from '../models/kit-grid-query.model.model';
import { KitGridResult } from '../models/kit-grid-result.model';
import { KitGridConfig } from '../models/kit-grid-config.model';
import { KitGridCellRenderer } from '../renderers/cell/kit-grid-cell-renderer';
import { KitGridHeaderRenderer } from '../renderers/header/kit-grid-header-renderer';
import { KitGridFooterRenderer } from '../renderers/footer/kit-grid-footer-renderer.model';
import { KitGridDefaultCellRendererComponent } from '../renderers/cell/default/kit-grid-default-cell-renderer.component';
import { KitGridDefaultHeaderRendererComponent } from '../renderers/header/default/kit-grid-default-header-renderer.component';
import { KitGridDefaultFooterRendererComponent } from '../renderers/footer/default/kit-grid-default-footer-renderer.component';

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

    @Input() dataSource!: KitGridDataSource<T>;
    @Input() columns: KitGridColumn<T>[] = [];
    @Input() columnDefaults?: Partial<KitGridColumn<T>>;
    @Input() config?: KitGridConfig;

    @ViewChildren('headerCell', { read: ViewContainerRef })
    headerCells!: QueryList<ViewContainerRef>;

    @ViewChildren('dataCell', { read: ViewContainerRef })
    dataCells!: QueryList<ViewContainerRef>;

    @ViewChild('footerCell', { read: ViewContainerRef, static: false })
    footerCell?: ViewContainerRef;

    result: KitGridResult<T> = { data: [], total: 0 };
    currentQuery: KitGridQuery = { page: 0, pageSize: 50 };

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
        if ((changes['dataSource'] || changes['columns']) && !changes['dataSource']?.firstChange) {
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

    @HostBinding('class.kit-grid-host-flex')
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
        const row = this.config?.row;
        if (row?.height != null) {
            return { height: `${row.height}px`, 'min-height': `${row.height}px`, 'max-height': `${row.height}px` };
        }
        const min = row?.minHeight ?? DEFAULT_ROW_MIN_PX;
        const max = Math.max(row?.maxHeight ?? DEFAULT_ROW_MAX_PX, min);
        return { 'min-height': `${min}px`, 'max-height': `${max}px` };
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

    private setResult(r: KitGridResult<T>): void {
        this.result = r;

        // Update cell renderers in-place — avoids relying on dataCells.changes
        // which only fires when the number of rows changes, not when data changes
        const colCount = this.columns.length;
        if (this.cellRefs.length === r.data.length * colCount) {
            this.cellRefs.forEach((ref, idx) => {
                const colIdx = idx % colCount;
                const rowIdx = Math.floor(idx / colCount);
                const col = { ...this.columnDefaults, ...this.columns[colIdx] } as KitGridColumn<T>;
                const row = r.data[rowIdx];
                ref.instance.value = row ? this.getFieldValue(row, col.field as string) : undefined;
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

    private readonly onHeaderQueryChange = async (query: KitGridQuery): Promise<void> => {
        if (!this.dataSource) return;
        const r = await this.dataSource.queryChange(query);
        this.currentQuery = query;
        this.setResult(r);
    };

    private readonly onFooterQueryChange = async (query: KitGridQuery): Promise<void> => {
        if (!this.dataSource) return;
        const r = await this.dataSource.queryChange(query);
        this.currentQuery = query;
        this.setResult(r);
    };

    private resolveColWidth(col: KitGridColumn<T>): string {
        const merged = { ...this.columnDefaults, ...col };

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
            const col = { ...this.columnDefaults, ...this.columns[i] } as KitGridColumn<T>;
            const { component, config } = col.headerRenderer ?? { component: KitGridDefaultHeaderRendererComponent };
            const ref = vcr.createComponent<KitGridHeaderRenderer>(component);
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
            const col = { ...this.columnDefaults, ...this.columns[colIdx] } as KitGridColumn<T>;
            const row = this.result.data[rowIdx];
            const { component, config } = col.cellRenderer ?? { component: KitGridDefaultCellRendererComponent };
            const ref = vcr.createComponent<KitGridCellRenderer>(component);
            ref.instance.value = row ? this.getFieldValue(row, col.field as string) : undefined;
            ref.instance.config = config;
            ref.changeDetectorRef.detectChanges();
            this.cellRefs.push(ref);
        });
    }

    private renderFooter(): void {
        if (!this.footerCell) return;
        this.footerRef?.destroy();
        this.footerCell.clear();
        const { component, config } = this.config?.footer ?? { component: KitGridDefaultFooterRendererComponent };
        const ref = this.footerCell.createComponent<KitGridFooterRenderer>(component);
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
