import { Component, inject } from '@angular/core';
import { KitLayoutModule, KitTextModule, KitButtonModule, SimpleTableComponent } from '../../../../../../ngx-kit-ui/src/public-api';
import { KitNavigationService } from '../../../../../../ngx-kit-ui/src/lib/services/navigation/navigation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-service',
  standalone: true,
  imports: [KitLayoutModule, KitTextModule, KitButtonModule, SimpleTableComponent],
  templateUrl: './navigation-service.component.html',
  styleUrls: ['./navigation-service.component.scss']
})
export class NavigationServiceComponent {

  constructor(private kitNavigationService: KitNavigationService) { }

  methodsDefinition = [
    { title: 'Method', lookupField: 'method' },
    { title: 'Description', lookupField: 'description' },
  ];

  methodsDataset = [
    { method: 'navigateTo(url: string)', description: 'Imperatively navigate to the provided route. Adds a new entry to the mirrored navigation history.' },
    { method: 'navigateForward()', description: 'Trigger browser forward navigation. The service clears the view stack when forwarding.' },
    { method: 'navigateBack()', description: 'Trigger browser back navigation. The service clears the view stack when going back.' },
    { method: 'pushView(url: string)', description: 'Push a UI-level view onto the in-memory view stack and navigate to it using skipLocationChange (does not change browser URL).' },
    { method: 'popView()', description: 'Pop the top view from the in-memory view stack and navigate to the previous view in the stack (no browser history change).' },
    { method: 'clearViewStack()', description: 'Clear the in-memory view stack immediately.' },
  ];

  propertiesDefinition = [
    { title: 'Property', lookupField: 'property' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Description', lookupField: 'description' },
  ];

  propertiesDataset = [
    { property: 'navigationHistory', type: 'Signal<string[]>', description: 'A signal that mirrors the visible browser route history up to the current index.' },
    { property: 'viewStack', type: 'Signal<string[]>', description: 'An in-memory stack of UI-level views used for transient screens. This does not affect browser history and is reset on real route changes or full reloads.' },
  ];

}
