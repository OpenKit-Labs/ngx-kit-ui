import { Routes } from '@angular/router';

export const PANELS_ROUTES: Routes = [
    {
        path: 'card',
        loadComponent: () => import('./card/card.component').then(m => m.CardComponent)
    },
    {
        path: 'badge',
        loadComponent: () => import('./badge/badge.component').then(m => m.BadgeComponent)
    }
];