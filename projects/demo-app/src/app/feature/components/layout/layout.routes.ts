import { Routes } from '@angular/router';

export const LAYOUT_ROUTES: Routes = [
    {
        path: 'app-root',
        loadComponent: () => import('./app-root/app-root.component').then(m => m.AppRootComponent)
    },
    {
        path: 'center',
        loadComponent: () => import('./center/center.component').then(m => m.CenterComponent)
    },
    {
        path: 'column',
        loadComponent: () => import('./column/column.component').then(m => m.ColumnComponent)
    },
    {
        path: 'constrained-box',
        loadComponent: () => import('./constrained-box/constrained-box.component').then(m => m.ConstrainedBoxComponent)
    },
    {
        path: 'container',
        loadComponent: () => import('./container/container.component').then(m => m.ContainerComponent)
    },
    {
        path: 'expanded',
        loadComponent: () => import('./expanded/expanded.component').then(m => m.ExpandedComponent)
    },
    {
        path: 'padding',
        loadComponent: () => import('./padding/padding.component').then(m => m.PaddingComponent)
    },
    {
        path: 'page',
        loadComponent: () => import('./page/page.component').then(m => m.PageComponent)
    },
    {
        path: 'row',
        loadComponent: () => import('./row/row.component').then(m => m.RowComponent)
    },
    {
        path: 'sized-box',
        loadComponent: () => import('./sized-box/sized-box.component').then(m => m.SizedBoxComponent)
    },
    {
        path: 'spacer',
        loadComponent: () => import('./spacer/spacer.component').then(m => m.SpacerComponent)
    },
    {
        path: 'stack',
        loadComponent: () => import('./stack/stack.component').then(m => m.StackComponent)
    },
    {
        path: 'sticky-container',
        loadComponent: () => import('./sticky-container/sticky-container.component').then(m => m.StickyContainerComponent)
    },
    {
        path: 'divider',
        loadComponent: () => import('./divider/divider.component').then(m => m.DividerComponent)
    },
    {
        path: 'top-bar',
        loadComponent: () => import('../layout/top-bar/top-bar.component').then(m => m.TopBarComponent)
    },
    {
        path: 'bottom-bar',
        loadComponent: () => import('../layout/bottom-bar/bottom-bar.component').then(m => m.BottomBarComponent)
    },
    {
        path: 'side-menu',
        loadComponent: () => import('../layout/side-menu/side-menu.component').then(m => m.SideMenuComponent)
    },
];