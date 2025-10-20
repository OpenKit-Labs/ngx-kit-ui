import { Component } from '@angular/core';
import { KitLayoutModule, KitTextBodyComponent, KitTextDisplayComponent, KitTextHeadingComponent } from '../../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../../shared/code-block/code-block.component';

@Component({
  selector: 'app-app-root',
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.scss'],
  standalone: true,
  imports: [
    KitLayoutModule,
    KitTextDisplayComponent,
    KitTextBodyComponent,
    KitTextHeadingComponent,
    CodeBlockComponent,
  ]
})
export class AppRootComponent {
  importModule = `import { KitLayoutModule } from ' @openkit-labs/ngx-kit-ui';`;
  importComponent = `import { KitAppRootComponent } from ' @openkit-labs/ngx-kit-ui';`;
  usage = `<kit-app-root>\n  <!-- Your content here -->\n</kit-app-root>`;
}