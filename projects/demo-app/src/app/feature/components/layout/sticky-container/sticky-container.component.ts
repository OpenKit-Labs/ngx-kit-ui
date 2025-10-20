import { Component } from '@angular/core';
import { CodeBlockComponent } from '../../../../shared/code-block/code-block.component';
import { KitLayoutModule, KitTextModule } from '../../../../../../../ngx-kit-ui/src/public-api';

@Component({
  selector: 'app-sticky-container',
  templateUrl: './sticky-container.component.html',
  styleUrls: ['./sticky-container.component.scss'],
  standalone: true,
  imports: [
    KitLayoutModule,
    CodeBlockComponent,
    KitTextModule
  ],
})
export class StickyContainerComponent {
  importModule = `import { LayoutModule } from ' @openkit-labs/ngx-kit-ui';`;
  importComponent = `import { StickyContainerComponent } from ' @openkit-labs/ngx-kit-ui';`;
  usage = `<kit-sticky-container>
  <kit-text-body>This content will stick to the top.</kit-text-body>
</kit-sticky-container>`;

  inputsDefinition: any[] = [];
  inputsDataset: any[] = [];
}
