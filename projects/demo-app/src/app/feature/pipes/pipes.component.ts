import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KitButtonModule, KitLayoutModule, KitTextModule, KitPanelModule } from '../../../../../ngx-kit-ui/src/public-api';

@Component({
  selector: 'app-pipes',
  standalone: true,
  imports: [RouterModule, KitButtonModule, KitLayoutModule, KitTextModule, KitPanelModule],
  templateUrl: './pipes.component.html',
  styleUrls: ['./pipes.component.scss']
})
export class PipesComponent {

  pipeGroups: Array<{ name: string, path: string, description: string, pipes: Array<{ name: string, path: string, description: string, enabled: boolean }> }> = [
    {
      name: 'Formatting',
      path: '',
      description: 'Pipes for formatting data.',
      pipes: [
        {
          name: 'File Size',
          path: 'file-size',
          description: 'Formats bytes into a human readable format.',
          enabled: true
        },
        {
          name: 'Time Ago',
          path: 'time-ago',
          description: 'Formats a date to show how long ago it was.',
          enabled: true
        },
        {
          name: 'KMB',
          path: 'kmb',
          description: 'Formats a number to be more readable (e.g. 1k, 1M, 1B). ',
          enabled: true
        }
      ]
    }
  ];
}
