import { Routes } from '@angular/router';
import { DirectivesComponent } from './directives.component';

export const DIRECTIVES_ROUTES: Routes = [
    {
        path: '',
        component: DirectivesComponent,
    },
    {
        path: 'press-and-hold',
        data: { title: 'Press and Hold Directive' },
        loadComponent: () => import('./press-and-hold-directive-demo/press-and-hold-directive-demo.component').then(m => m.PressAndHoldDirectiveDemoComponent)
    },
    {
        path: 'copy-to-clipboard',
        data: { title: 'Copy to Clipboard Directive' },
        loadComponent: () => import('./copy-to-clipboard-directive-demo/copy-to-clipboard-directive-demo.component').then(m => m.CopyToClipboardDirectiveDemoComponent)
    }
];
