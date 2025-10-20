import { Component } from '@angular/core';
import { CodeBlockComponent } from '../../../../shared/code-block/code-block.component';

import { KitLayoutModule, KitTextModule, SimpleTableComponent } from '../../../../../../../ngx-kit-ui/src/public-api';

@Component({
  selector: 'app-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss'],
  standalone: true,
  imports: [
    KitLayoutModule,
    CodeBlockComponent,
    KitTextModule,
    SimpleTableComponent
  ],
})
export class DividerComponent {
  importModule = `import { KitLayoutModule } from ' @openkit-labs/ngx-kit-ui';`;
  importComponent = `import { KitDividerComponent } from ' @openkit-labs/ngx-kit-ui';`;
  usage = `<kit-divider></kit-divider>`;

  inputsDefinition = [
    { title: 'Input', lookupField: 'input' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];
  inputsDataset = [
    { input: 'orientation', type: 'DividerOrientation', default: "'horizontal'", description: 'The orientation of the divider.' },
    { input: 'color', type: 'ButtonColor | string', default: "'var(--kit-divider-default-color)'", description: 'The color of the divider.' },
    { input: 'thickness', type: 'string', default: "'var(--kit-divider-default-thickness)'", description: 'The thickness of the divider.' },
  ];
}
