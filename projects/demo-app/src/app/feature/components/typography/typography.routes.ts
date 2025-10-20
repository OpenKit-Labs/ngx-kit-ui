import { Routes } from '@angular/router';

export const TYPOGRAPHY_ROUTES: Routes = [
    {
        path: 'text',
        loadComponent: () => import('./text/text.component').then(m => m.TextComponent)
    }
];