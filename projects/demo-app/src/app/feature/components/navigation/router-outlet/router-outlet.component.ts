import { Component } from '@angular/core';
import { KitLayoutModule, KitTextModule } from '../../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../../shared/code-block/code-block.component';

@Component({
  selector: 'app-router-outlet',
  templateUrl: './router-outlet.component.html',
  styleUrls: ['./router-outlet.component.scss'],
  standalone: true,
  imports: [
    KitTextModule,
    KitLayoutModule,
    CodeBlockComponent,
  ]
})
export class RouterOutletComponent {
  importModule = `import { NavigationModule } from ' @openkit-labs/ngx-kit-ui';`;
  importComponent = `import { KitRouterOutletComponent } from ' @openkit-labs/ngx-kit-ui';`;
  usage = `<kit-router-outlet></kit-router-outlet>`;
}
