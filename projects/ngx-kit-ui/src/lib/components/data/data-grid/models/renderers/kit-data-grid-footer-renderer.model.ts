import { Type } from '@angular/core';
import { KitDataGridQuery } from '../data-source/kit-data-grid-query.model';
import { KitDataGridResult } from '../data-source/kit-data-grid-result.model';

export interface KitDataGridFooterRenderer<TConfig = any> {
    result: KitDataGridResult<any>;
    query: KitDataGridQuery;
    onQueryChange: (query: KitDataGridQuery) => void;
    config?: TConfig;
}

export interface KitDataGridFooterConfig {
    /** The footer renderer component. */
    renderer: Type<KitDataGridFooterRenderer>;
    /** Footer renderer config. */
    config?: any;
    /** Whether to show the footer. Defaults to true. */
    isVisible?: boolean;
}

export function kitFooterRenderer<C>(
    component: { new(...args: any[]): KitDataGridFooterRenderer<C> },
    config?: C
): KitDataGridFooterConfig {
    return { renderer: component as Type<KitDataGridFooterRenderer>, config };
}
