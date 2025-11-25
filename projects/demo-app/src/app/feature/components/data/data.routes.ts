import { Routes } from '@angular/router';

export const DATA_DISPLAY_ROUTES: Routes = [
    {
        path: 'simple-table',
        loadComponent: () => import('./simple-table/simple-table.component').then(m => m.SimpleTableDemoComponent)
    },
    {
        path: 'progress-bar',
        loadComponent: () => import('./progress-bar-demo/progress-bar-demo.component').then(m => m.ProgressBarDemoComponent)
    }
];