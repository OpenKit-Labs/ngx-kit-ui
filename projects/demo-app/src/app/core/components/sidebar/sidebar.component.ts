
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { KitButtonModule, KitThemeService, KitLayoutModule, KitTextModule } from '../../../../../../ngx-kit-ui/src/public-api';

@Component({
  selector: 'app-sidebar',
  imports: [KitTextModule, KitLayoutModule, KitButtonModule, NgIcon],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  theme: 'kit-theme-light' | 'kit-theme-dark' = 'kit-theme-light';

  constructor(private kitThemeService: KitThemeService, private router: Router) {
    this.theme = this.kitThemeService.getTheme() as 'kit-theme-light' | 'kit-theme-dark';
  }

  onChangeTheme(theme: 'kit-theme-light' | 'kit-theme-dark') {
    this.kitThemeService.setTheme(theme);
    this.theme = theme;
  }

  onNavigate(url: string) {
    this.router.navigate([url]);
  }

  onLogoClick() {
    window.location.reload();
    window.location.href = '/';
  }
}
