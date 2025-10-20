import { Routes } from '@angular/router';

export const NAVIGATION_ROUTES: Routes = [
    {
        path: 'router-outlet',
        loadComponent: () => import('./router-outlet/router-outlet.component').then(m => m.RouterOutletComponent)
    },
    {
        path: 'tab-view',
        loadComponent: () => import('./tab-view/tab-view.component').then(m => m.TabViewComponent)
    }
];