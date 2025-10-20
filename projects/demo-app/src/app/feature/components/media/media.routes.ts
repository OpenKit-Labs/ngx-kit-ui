import { Routes } from '@angular/router';

export const MEDIA_ROUTES: Routes = [
    {
        path: 'image',
        data: { title: 'Image' },
        loadComponent: () => import('./image/image.component').then(m => m.ImageComponent)
    },
    {
        path: 'avatar',
        data: { title: 'Avatar' },
        loadComponent: () => import('./avatar/avatar.component').then(m => m.AvatarComponent)
    },
];