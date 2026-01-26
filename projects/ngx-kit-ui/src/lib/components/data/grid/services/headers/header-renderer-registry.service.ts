import { Injectable, Type } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class KitDataGridHeaderRendererRegistry {
    private registry = new Map<string, Type<any>>();

    register(type: string, renderer: Type<any>): void {
        this.registry.set(type, renderer);
    }

    resolve(type: string): Type<any> {
        const renderer = this.registry.get(type);
        if (!renderer) {
            throw new Error(`Header renderer not found for type: ${type}`);
        }
        return renderer;
    }
}
