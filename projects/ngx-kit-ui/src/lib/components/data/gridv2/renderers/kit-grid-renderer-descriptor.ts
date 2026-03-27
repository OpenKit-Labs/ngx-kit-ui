import { Type } from '@angular/core';
import { KitGridCellRenderer } from './cell/kit-grid-cell-renderer';
import { KitGridHeaderRenderer } from './header/kit-grid-header-renderer';
import { KitGridFooterRenderer } from './footer/kit-grid-footer-renderer.model';

export interface KitGridCellRendererDescriptor {
    component: Type<KitGridCellRenderer>;
    config?: any;
}

export interface KitGridHeaderRendererDescriptor {
    component: Type<KitGridHeaderRenderer>;
    config?: any;
}

export interface KitGridFooterRendererDescriptor {
    component: Type<KitGridFooterRenderer>;
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
    component: { new(...args: any[]): KitGridCellRenderer<any, C> },
    config?: C
): KitGridCellRendererDescriptor {
    return { component: component as Type<KitGridCellRenderer>, config };
}

/**
 * Creates a typed header renderer descriptor. Use for custom header renderers
 * when you want type-safe config intellisense.
 *
 * @example
 * headerRenderer: kitHeaderRenderer(MyHeaderComponent, { sortable: false })
 */
export function kitHeaderRenderer<C>(
    component: { new(...args: any[]): KitGridHeaderRenderer<C> },
    config?: C
): KitGridHeaderRendererDescriptor {
    return { component: component as Type<KitGridHeaderRenderer>, config };
}

/**
 * Creates a typed footer renderer descriptor. Use for custom footer renderers
 * when you want type-safe config intellisense.
 *
 * @example
 * footer: kitFooterRenderer(MyFooterComponent, { showPageInfo: true })
 */
export function kitFooterRenderer<C>(
    component: { new(...args: any[]): KitGridFooterRenderer<C> },
    config?: C
): KitGridFooterRendererDescriptor {
    return { component: component as Type<KitGridFooterRenderer>, config };
}
