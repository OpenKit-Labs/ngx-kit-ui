import { Component } from '@angular/core';
import { KitLayoutModule, KitTextModule } from '../../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../../shared/code-block/code-block.component';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  standalone: true,
  imports: [
    KitTextModule,
    KitLayoutModule,
    CodeBlockComponent,
  ]
})
export class SideMenuComponent {
  importModule = `import { NavigationModule } from ' @openkit-labs/ngx-kit-ui';`;
  importComponent = `import { SideMenuComponent } from ' @openkit-labs/ngx-kit-ui';`;
  usage = `<kit-side-menu>
  <!-- Side menu content -->
</kit-side-menu>`;
}