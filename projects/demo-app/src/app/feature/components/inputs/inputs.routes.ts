import { Routes } from '@angular/router';

export const INPUTS_ROUTES: Routes = [
    {
        path: 'text',
        loadComponent: () => import('./text/text.component').then(m => m.TextComponent)
    },
    {
        path: 'email',
        loadComponent: () => import('./email/email.component').then(m => m.EmailComponent)
    },
    {
        path: 'password',
        loadComponent: () => import('./password/password.component').then(m => m.PasswordComponent)
    },
    {
        path: 'text-area',
        loadComponent: () => import('./text-area/text-area.component').then(m => m.TextAreaComponent)
    },
    {
        path: 'number',
        loadComponent: () => import('./number/number.component').then(m => m.NumberComponent)
    },
    {
        path: 'phone',
        loadComponent: () => import('./phone/phone.component').then(m => m.PhoneComponent)
    },
    {
        path: 'otp',
        loadComponent: () => import('./otp/otp.component').then(m => m.OtpComponent)
    },
    {
        path: 'single-select',
        loadComponent: () => import('./single-select/single-select.component').then(m => m.SingleSelectComponent)
    },
    {
        path: 'multi-select',
        loadComponent: () => import('./multi-select/multi-select.component').then(m => m.MultiSelectComponent)
    },
    {
        path: 'time',
        loadComponent: () => import('./input-time/input-time.component').then(m => m.InputTimeComponent)
    },
    {
        path: 'date',
        loadComponent: () => import('./input-date/input-date.component').then(m => m.InputDateComponent)
    }
];