import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KitButtonModule, KitLayoutModule, KitTextModule, KitPanelModule } from '../../../../../ngx-kit-ui/src/public-api';

@Component({
  selector: 'app-tutorials',
  standalone: true,
  imports: [RouterModule, KitButtonModule, KitLayoutModule, KitTextModule, KitPanelModule],
  templateUrl: './tutorials.component.html',
  styleUrls: ['./tutorials.component.scss']
})
export class TutorialsComponent {

  tutorialGroups: Array<{ name: string, path: string, description: string, tutorials: Array<{ name: string, path: string, description: string, enabled: boolean }> }> = [
    {
      name: 'Basics',
      path: '',
      description: 'Basic tutorials to get you started with the library',
      tutorials: [
        {
          name: 'Getting Started',
          path: 'getting-started',
          description: 'A quick start guide on how to setup your project',
          enabled: true
        },
        {
          name: 'Creating a Page',
          path: 'creating-a-page',
          description: 'Learn how to create a page using the layout components',
          enabled: true
        }
      ]
    },
    {
      name: 'Navigation',
      path: '',
      description: 'Learn how to use the navigation system',
      tutorials: [
        {
          name: 'Routes & Stacks',
          path: 'navigating',
          description: 'Understanding routes and navigation stacks',
          enabled: true
        }
      ]
    }
  ];
}
