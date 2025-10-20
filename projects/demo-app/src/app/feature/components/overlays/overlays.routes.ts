import { Routes } from '@angular/router';

export const OVERLAYS_ROUTES: Routes = [
    {
        path: 'dialog',
        loadComponent: () => import('./dialog/dialog.component').then(m => m.DialogComponent)
    },
    {
        path: 'bottom-sheet',
        loadComponent: () => import('./bottom-sheet/bottom-sheet.component').then(m => m.BottomSheetComponent)
    }
];