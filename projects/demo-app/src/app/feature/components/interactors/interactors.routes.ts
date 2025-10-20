
import { Routes } from '@angular/router';

export const INTERACTORS_ROUTES: Routes = [
    {
        path: 'gesture-detector',
        data: { title: 'Gesture Detector' },
        loadComponent: () => import('./gesture-detector/gesture-detector.component').then(m => m.GestureDetectorComponent)
    },
];
