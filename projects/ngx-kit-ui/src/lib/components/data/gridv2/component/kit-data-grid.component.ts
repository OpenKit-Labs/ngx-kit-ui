import {
    Component,
    Input,
    OnInit,
    OnChanges,
    SimpleChanges,
    ViewChildren,
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
import { KitGridCellRenderer } from '../renderers/kit-grid-cell-renderer';
import { KitGridHeaderRenderer } from '../renderers/kit-grid-header-renderer';
import { KitGridDefaultCellRendererComponent } from '../renderers/defaults/kit-grid-default-cell-renderer.component';
import { KitGridDefaultHeaderRendererComponent } from '../renderers/defaults/kit-grid-default-header-renderer.component';

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

    result: KitGridResult<T> = { data: [], total: 0 };
    currentQuery: KitGridQuery = { page: 0, pageSize: 50 };

    private headerRefs: ComponentRef<any>[] = [];
    private cellRefs: ComponentRef<any>[] = [];

    constructor(private cdr: ChangeDetectorRef) { }

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
        this.headerCells.changes.subscribe(() => this.renderHeaders());
        this.dataCells.changes.subscribe(() => this.renderCells());
    }

    ngOnDestroy(): void {
        this.destroyRefs(this.headerRefs);
        this.destroyRefs(this.cellRefs);
    }

    // ── Public helpers used by template ──────────────────────────────────────

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

    private async reload(): Promise<void> {
        if (!this.dataSource) return;
        const r = await this.dataSource.queryChange(this.currentQuery);
        this.setResult(r);
    }

    private setResult(r: KitGridResult<T>): void {
        this.result = r;
        this.cdr.markForCheck();
    }

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
            const type = col.headerRenderer ?? KitGridDefaultHeaderRendererComponent;
            const ref = vcr.createComponent<KitGridHeaderRenderer>(type);
            ref.instance.title = col.title;
            ref.instance.config = col.rendererConfig;
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
            const type = col.cellRenderer ?? KitGridDefaultCellRendererComponent;
            const ref = vcr.createComponent<KitGridCellRenderer>(type);
            ref.instance.value = row ? (row as any)[col.field as string] : undefined;
            ref.instance.config = col.rendererConfig;
            ref.changeDetectorRef.detectChanges();
            this.cellRefs.push(ref);
        });
    }

    private destroyRefs(refs: ComponentRef<any>[]): void {
        refs.forEach(r => r.destroy());
        refs.length = 0;
    }
}
