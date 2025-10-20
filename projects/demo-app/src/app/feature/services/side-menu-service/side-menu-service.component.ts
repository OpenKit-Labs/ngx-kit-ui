import { Component } from '@angular/core';
import { KitLayoutModule, KitTextModule, SimpleTableComponent } from '../../../../../../ngx-kit-ui/src/public-api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-side-menu-service',
  standalone: true,
  imports: [KitLayoutModule, KitTextModule, SimpleTableComponent, CommonModule],
  templateUrl: './side-menu-service.component.html',
  styleUrls: ['./side-menu-service.component.scss']
})
export class SideMenuServiceComponent {

  methodsDefinition = [
    { title: 'Method', lookupField: 'method' },
    { title: 'Description', lookupField: 'description' },
  ];

  methodsDataset = [
    { method: 'toggle()', description: 'Toggle the menu open/close state.' },
    { method: 'open()', description: 'Force open the menu.' },
    { method: 'close()', description: 'Force close the menu.' },
    { method: "setMode(mode: 'overlay' | 'side')", description: 'Set the menu display mode.' },
    { method: 'setWidth(width: string)', description: 'Set the menu width (e.g. "280px").' },
    { method: 'Signals (read-only)', description: 'Read current state via `isOpen`, `mode`, and `width` signals.' },
  ];

  propertiesDefinition = [
    { title: 'Property', lookupField: 'property' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Description', lookupField: 'description' },
  ];

  propertiesDataset = [
    { property: 'isOpen', type: 'Signal<boolean>', description: 'Read-only signal indicating whether the menu is open.' },
    { property: 'mode', type: "Signal<'overlay' | 'side'>", description: 'Read-only signal for the menu display mode.' },
    { property: 'width', type: 'Signal<string>', description: 'Read-only signal for the menu width.' },
  ];

}
