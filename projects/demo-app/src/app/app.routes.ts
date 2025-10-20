import { Routes } from '@angular/router';
import { HomeComponent } from './feature/home/home.component';

export const APP_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'installation',
        data: { title: 'Installation' },
        loadComponent: () => import('./feature/installation/installation.component').then(m => m.InstallationComponent),
    },
    {
        path: 'themes',
        data: { title: 'Themes' },
        loadComponent: () => import('./feature/themes/themes.component').then(m => m.ThemesComponent),
    },
    {
        path: 'components',
        data: { title: 'Components' },
        loadChildren: () => import('./feature/components/components.routes').then(m => m.COMPONENTS_ROUTES)
    },
    {
        path: 'pipes',
        data: { title: 'Pipes' },
        loadChildren: () => import('./feature/pipes/pipes.routes').then(m => m.PIPES_ROUTES)
    },
    {
        path: 'services',
        data: { title: 'Services' },
        loadChildren: () => import('./feature/services/services.routes').then(m => m.SERVICES_ROUTES)
    },
    {
        path: 'directives',
        data: { title: 'Directives' },
        loadChildren: () => import('./feature/directives/directives.routes').then(m => m.DIRECTIVES_ROUTES)
    },
    {
        path: 'templates',
        data: { title: 'Templates' },
        loadChildren: () => import('./feature/templates/templates.routes').then(m => m.TEMPLATES_ROUTES)
    },
    {
        path: 'tutorials',
        data: { title: 'Tutorials' },
        loadChildren: () => import('./feature/tutorials/tutorials.routes').then(m => m.TUTORIALS_ROUTES)
    }
];