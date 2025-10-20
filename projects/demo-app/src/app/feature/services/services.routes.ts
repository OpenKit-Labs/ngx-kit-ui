import { Routes } from '@angular/router';
import { ServicesComponent } from './services.component';

export const SERVICES_ROUTES: Routes = [
    {
        path: '',
        component: ServicesComponent,
    },
    {
        path: 'navigation-service',
        data: { title: 'Navigation Service' },
        loadComponent: () => import('./navigation-service/navigation-service.component').then(m => m.NavigationServiceComponent)
    },
    {
        path: 'screen-service',
        data: { title: 'Screen Service' },
        loadComponent: () => import('./screen-service/screen-service.component').then(m => m.ScreenServiceComponent)
    },
    {
        path: 'theme-service',
        data: { title: 'Theme Service' },
        loadComponent: () => import('./theme-service/theme-service.component').then(m => m.ThemeServiceComponent)
    },
    {
        path: 'side-menu-service',
        data: { title: 'Side Menu Service' },
        loadComponent: () => import('./side-menu-service/side-menu-service.component').then(m => m.SideMenuServiceComponent)
    }
];