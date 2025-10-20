import { Component } from '@angular/core';
import { KitLayoutModule, KitTextModule, SimpleTableComponent } from '../../../../../../ngx-kit-ui/src/public-api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-screen-service',
  standalone: true,
  imports: [KitLayoutModule, KitTextModule, SimpleTableComponent, CommonModule],
  templateUrl: './screen-service.component.html',
  styleUrls: ['./screen-service.component.scss']
})
export class ScreenServiceComponent {

  constructor() { }

  propertiesDefinition = [
    { title: 'Property', lookupField: 'property' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Description', lookupField: 'description' },
  ];

  propertiesDataset = [
    {
      property: 'currentSize',
      type: 'Signal<ScreenSize>',
      description: 'A signal that holds the current screen size.'
    },
    {
      property: 'isSmall',
      type: 'Signal<boolean>',
      description: 'A signal indicating whether the screen size is small.'
    },
    {
      property: 'isMedium',
      type: 'Signal<boolean>',
      description: 'A signal indicating whether the screen size is medium.'
    },
    {
      property: 'isLarge',
      type: 'Signal<boolean>',
      description: 'A signal indicating whether the screen size is large.'
    },
  ];

  methodsDefinition = [
    { title: 'Method', lookupField: 'method' },
    { title: 'Description', lookupField: 'description' },
  ];

  methodsDataset = [
    { method: 'setBreakpoints(breakpoints: Partial<ScreenBreakpoints>)', description: 'Sets custom breakpoints.' },
    { method: 'isScreenSize(size: ScreenSize)', description: 'Checks if the current screen matches the given size.' },
    { method: 'getCurrentSize()', description: 'Gets the current screen size.' },
    { method: 'isScreenSizeAtLeast(size: ScreenSize)', description: 'Checks if the screen is at least the specified size.' },
  ];
}
