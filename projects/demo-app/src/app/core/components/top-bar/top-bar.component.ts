import { Component } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { KitButtonModule, KitNavigationService, KitSideMenuService, KitLayoutModule, KitTextModule } from '../../../../../../ngx-kit-ui/src/public-api';

@Component({
  selector: 'app-top-bar',
  imports: [KitLayoutModule, KitTextModule, KitButtonModule, NgIcon],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {

  constructor(private kitSideMenuService: KitSideMenuService, public kitNavigationService: KitNavigationService) { }

  onToggleSideMenu() {
    this.kitSideMenuService.toggle();
  }

}
