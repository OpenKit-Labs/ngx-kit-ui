import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';

import { PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading } from '@angular/router';
import { APP_ROUTES } from './app.routes';

import * as outlineIcons from '@ng-icons/mynaui/outline';
import * as solidIcons from '@ng-icons/mynaui/solid';
import { provideIcons, provideNgIconsConfig } from '@ng-icons/core';
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(APP_ROUTES, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withPreloading(PreloadAllModules)),
    // provideNgIconsConfig({ size: '1.5em' }),
    provideIcons({ ...outlineIcons, ...solidIcons }),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
};
