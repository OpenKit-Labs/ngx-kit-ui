import { Component } from '@angular/core';
import { KitLayoutModule, KitTextModule, KitButtonModule, SimpleTableComponent } from '../../../../../../ngx-kit-ui/src/public-api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme-service',
  standalone: true,
  imports: [KitLayoutModule, KitTextModule, KitButtonModule, SimpleTableComponent, CommonModule],
  templateUrl: './theme-service.component.html',
  styleUrls: ['./theme-service.component.scss']
})
export class ThemeServiceComponent {

  methodsDefinition = [
    { title: 'Method', lookupField: 'method' },
    { title: 'Description', lookupField: 'description' },
  ];

  methodsDataset = [
    { method: 'setTheme(themeClass: string)', description: 'Sets the theme for the application.' },
    { method: 'getTheme()', description: 'Gets the current theme.' },
  ];

  propertiesDefinition = [
    { title: 'Property', lookupField: 'property' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Description', lookupField: 'description' },
  ];

  propertiesDataset = [
    { property: 'currentTheme', type: 'Signal<string>', description: 'Read-only signal for the current theme class.' },
  ];

}
