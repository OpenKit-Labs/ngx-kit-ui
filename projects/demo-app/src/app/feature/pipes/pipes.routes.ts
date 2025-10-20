import { Routes } from '@angular/router';
import { PipesComponent } from './pipes.component';

export const PIPES_ROUTES: Routes = [
    {
        path: '',
        component: PipesComponent,
    },
    {
        path: 'file-size',
        data: { title: 'File Size Pipe' },
        loadComponent: () => import('./file-size-pipe-demo/file-size-pipe-demo.component').then(m => m.FileSizePipeDemoComponent)
    },
    {
        path: 'time-ago',
        data: { title: 'Time Ago Pipe' },
        loadComponent: () => import('./time-ago-pipe-demo/time-ago-pipe-demo.component').then(m => m.TimeAgoPipeDemoComponent)
    },
    {
        path: 'kmb',
        data: { title: 'KMB Pipe' },
        loadComponent: () => import('./kmb-pipe-demo/kmb-pipe-demo.component').then(m => m.KmbPipeDemoComponent)
    }
];
