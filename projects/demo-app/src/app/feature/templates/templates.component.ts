import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KitButtonModule, KitLayoutModule, KitTextModule, KitPanelModule } from '../../../../../ngx-kit-ui/src/public-api';

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [RouterModule, KitButtonModule, KitLayoutModule, KitTextModule, KitPanelModule],
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent {

  templateGroups: Array<{ name: string, path: string, description: string, templates: Array<{ name: string, path: string, description: string, enabled: boolean }> }> = [];
}
