import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KitButtonModule, KitLayoutModule, KitTextModule, KitPanelModule } from '../../../../../ngx-kit-ui/src/public-api';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterModule, KitButtonModule, KitLayoutModule, KitTextModule, KitPanelModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  serviceGroups: Array<{ name: string, path: string, description: string, services: Array<{ name: string, path: string, description: string, enabled: boolean }> }> = [
    {
      name: '',
      path: '',
      description: '',
      services: [
        {
          name: 'Navigation Service',
          path: 'navigation-service',
          description: 'A service to manage navigation within your application',
          enabled: true
        },
        {
          name: 'Screen Service',
          path: 'screen-service',
          description: 'A service to get information about the screen size',
          enabled: true
        },
        {
          name: 'Theme Service',
          path: 'theme-service',
          description: 'A service to manage the application theme',
          enabled: true
        },
        {
          name: 'Side Menu Service',
          path: 'side-menu-service',
          description: 'A service to manage the side menu',
          enabled: true
        }
      ]
    }
  ];
}