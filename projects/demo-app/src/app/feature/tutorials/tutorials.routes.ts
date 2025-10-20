import { Routes } from '@angular/router';
import { TutorialsComponent } from './tutorials.component';

export const TUTORIALS_ROUTES: Routes = [
    {
        path: '',
        component: TutorialsComponent,
    },
    {
        path: 'getting-started',
        data: { title: 'Getting Started' },
        loadComponent: () => import('./getting-started/getting-started.component').then(m => m.GettingStartedComponent),
    },
    {
        path: 'creating-a-page',
        data: { title: 'Creating a Page' },
        loadComponent: () => import('./creating-page/creating-page.component').then(m => m.CreatingPageComponent),
    },
    {
        path: 'navigating',
        data: { title: 'Navigating' },
        loadComponent: () => import('./navigating/navigating.component').then(m => m.NavigatingComponent),
    }
];