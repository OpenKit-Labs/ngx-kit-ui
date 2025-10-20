import { Routes } from '@angular/router';
import { ComponentsComponent } from './components.component';

export const COMPONENTS_ROUTES: Routes = [
    {
        path: '',
        component: ComponentsComponent,
    },
    {
        path: 'buttons',
        loadChildren: () =>
            import('./buttons/button.routes').then(m => m.BUTTON_ROUTES),
    },
    {
        path: 'inputs',
        loadChildren: () =>
            import('./inputs/inputs.routes').then(m => m.INPUTS_ROUTES),
    },
    {
        path: 'layout',
        loadChildren: () =>
            import('./layout/layout.routes').then(m => m.LAYOUT_ROUTES),
    },
    {
        path: 'media',
        loadChildren: () =>
            import('./media/media.routes').then(m => m.MEDIA_ROUTES)
    },
    {
        path: 'navigation',
        loadChildren: () =>
            import('./navigation/navigation.routes').then(m => m.NAVIGATION_ROUTES)
    },
    {
        path: 'overlays',
        loadChildren: () =>
            import('./overlays/overlays.routes').then(m => m.OVERLAYS_ROUTES)
    },
    {
        path: 'panels',
        loadChildren: () =>
            import('./panels/panels.routes').then(m => m.PANELS_ROUTES)
    },
    {
        path: 'data-display',
        loadChildren: () =>
            import('./data/data.routes').then(m => m.DATA_DISPLAY_ROUTES)
    },
    {
        path: 'interactors',
        loadChildren: () =>
            import('./interactors/interactors.routes').then(m => m.INTERACTORS_ROUTES)
    },
    {
        path: 'typography',
        loadChildren: () =>
            import('./typography/typography.routes').then(m => m.TYPOGRAPHY_ROUTES)
    }
];
