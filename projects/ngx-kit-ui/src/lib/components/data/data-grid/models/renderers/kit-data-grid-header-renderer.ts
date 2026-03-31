import { Type } from '@angular/core';
import { KitDataGridQuery } from '../data-source/kit-data-grid-query.model';

export interface KitDataGridHeaderRenderer<TConfig = any> {
    title: string;
    field: string;
    query: KitDataGridQuery;
    onQueryChange: (query: KitDataGridQuery) => void;
    config?: TConfig;
}

export interface KitDataGridHeaderRendererDescriptor {
    component: Type<KitDataGridHeaderRenderer>;
    config?: any;
}

export function kitHeaderRenderer<C>(
    component: { new(...args: any[]): KitDataGridHeaderRenderer<C> },
    config?: C
): KitDataGridHeaderRendererDescriptor {
    return { component: component as Type<KitDataGridHeaderRenderer>, config };
}
