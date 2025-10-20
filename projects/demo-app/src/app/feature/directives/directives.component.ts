import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KitButtonModule, KitLayoutModule, KitTextModule, KitPanelModule } from '../../../../../ngx-kit-ui/src/public-api';

@Component({
  selector: 'app-directives',
  standalone: true,
  imports: [RouterModule, KitButtonModule, KitLayoutModule, KitTextModule, KitPanelModule],
  templateUrl: './directives.component.html',
  styleUrls: ['./directives.component.scss']
})
export class DirectivesComponent {

  directiveGroups: Array<{ name: string, path: string, description: string, directives: Array<{ name: string, path: string, description: string, enabled: boolean }> }> = [
    {
      name: 'Events',
      path: '',
      description: 'Directives that handle events.',
      directives: [
        {
          name: 'Press and Hold',
          path: 'press-and-hold',
          description: 'Triggers an event when an element is pressed and held.',
          enabled: true
        },
        {
          name: 'Copy to Clipboard',
          path: 'copy-to-clipboard',
          description: 'Copies a value to the clipboard.',
          enabled: true
        }
      ]
    }
  ];
}
