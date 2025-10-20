import { Component, effect } from '@angular/core';
import { KitAppRootComponent, KitSideMenuComponent, KitRouterOutletComponent, KitScreenService, KitSideMenuService, KitTopBarComponent, KitThemeService } from '../../../ngx-kit-ui/src/public-api';

import { SidebarComponent } from './core/components/sidebar/sidebar.component';
import { TopBarComponent } from './core/components/top-bar/top-bar.component';

@Component({
  selector: 'app-root',
  imports: [KitAppRootComponent, KitSideMenuComponent, KitTopBarComponent, KitRouterOutletComponent, SidebarComponent, TopBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  theme: 'kit-theme-light' | 'kit-theme-dark' = 'kit-theme-light';

  constructor(private kitSideMenuService: KitSideMenuService, private kitScreenService: KitScreenService, private kitThemeService: KitThemeService) {

    const currentTheme = this.kitThemeService.getTheme();
    this.theme = currentTheme === 'kit-theme-dark' ? 'kit-theme-dark' : 'kit-theme-light';
    this.kitThemeService.setTheme(this.theme);

    effect(() => {
      const size = this.kitScreenService.currentSize();
      if (size !== 'large') {
        this.kitSideMenuService.setMode('overlay');
        this.kitSideMenuService.close();
      } else {
        this.kitSideMenuService.setMode('side');
        this.kitSideMenuService.open();
      }
    });
  }

}
