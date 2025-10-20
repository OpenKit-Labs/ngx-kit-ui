import { NgModule } from '@angular/core';
import { KitRouterOutletComponent } from './router-outlet/router-outlet.component';
import { KitTabViewComponent } from './tab-view/tab-view/tab-view.component';
import { KitTabContentComponent } from './tab-view/tab-content/tab-content.component';

@NgModule({
    imports: [
        KitRouterOutletComponent,
        KitTabViewComponent,
        KitTabContentComponent
    ],
    exports: [
        KitRouterOutletComponent,
        KitTabViewComponent,
        KitTabContentComponent
    ]
})
export class KitNavigationModule { }