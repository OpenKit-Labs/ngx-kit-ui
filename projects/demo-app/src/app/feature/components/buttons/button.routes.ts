import { Routes } from '@angular/router';

export const BUTTON_ROUTES: Routes = [
    {
        path: 'regular-buttons',
        data: { title: 'Regular Buttons' },
        loadComponent: () => import('./regular-buttons/regular-buttons.component').then(m => m.RegularButtonsComponent)
    },
    {
        path: 'round-buttons',
        data: { title: 'Round Buttons' },
        loadComponent: () => import('./round-buttons/round-buttons.component').then(m => m.RoundButtonsComponent)
    },
    {
        path: 'text-buttons',
        loadComponent: () => import('./text-buttons/text-buttons.component').then(m => m.TextButtonsComponent)
    },
    {
        path: 'floating-action-buttons',
        loadComponent: () => import('./floating-action-buttons/floating-action-buttons.component').then(m => m.FloatingActionButtonsComponent)
    },
    {
        path: 'button-group',
        loadComponent: () => import('./button-group/button-group.component').then(m => m.ButtonGroupComponent)
    }
];