import { Type } from '@angular/core';
import { KitDataGridCellRenderer } from '../models/renderers/kit-data-grid-cell-renderer.model';
import { KitDataGridHeaderRenderer } from '../models/renderers/kit-data-grid-header-renderer';
import { KitDataGridFooterRenderer, KitDataGridFooterConfig } from '../models/renderers/kit-data-grid-footer-renderer.model';

export interface KitDataGridCellRendererDescriptor {
    component: Type<KitDataGridCellRenderer>;
    config?: any;
}

export interface KitDataGridHeaderRendererDescriptor {
    component: Type<KitDataGridHeaderRenderer>;
    config?: any;
}

/**
 * Creates a typed cell renderer descriptor. Use for custom cell renderers
 * when you want type-safe config intellisense.
 *
 * @example
 * cellRenderer: kitCellRenderer(MyCellComponent, { myOption: true })
 */
export function kitCellRenderer<C>(
    component: { new(...args: any[]): KitDataGridCellRenderer<any, C> },
    config?: C
): KitDataGridCellRendererDescriptor {
    return { component: component as Type<KitDataGridCellRenderer>, config };
}

/**
 * Creates a typed header renderer descriptor. Use for custom header renderers
 * when you want type-safe config intellisense.
 *
 * @example
 * headerRenderer: kitHeaderRenderer(MyHeaderComponent, { sortable: false })
 */
export function kitHeaderRenderer<C>(
    component: { new(...args: any[]): KitDataGridHeaderRenderer<C> },
    config?: C
): KitDataGridHeaderRendererDescriptor {
    return { component: component as Type<KitDataGridHeaderRenderer>, config };
}

/**
 * Creates a typed footer renderer descriptor. Use for custom footer renderers
 * when you want type-safe config intellisense.
 *
 * @example
 * footer: kitFooterRenderer(MyFooterComponent, { showPageInfo: true })
 */
export function kitFooterRenderer<C>(
    component: { new(...args: any[]): KitDataGridFooterRenderer<C> },
    config?: C
): KitDataGridFooterConfig {
    return { renderer: component as Type<KitDataGridFooterRenderer>, config };
}
