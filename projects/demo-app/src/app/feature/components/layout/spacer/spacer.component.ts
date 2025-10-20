import { Component } from '@angular/core';
import { CodeBlockComponent } from '../../../../shared/code-block/code-block.component';

import { KitLayoutModule, KitTextModule, SimpleTableComponent } from '../../../../../../../ngx-kit-ui/src/public-api';

@Component({
  selector: 'app-spacer',
  templateUrl: './spacer.component.html',
  styleUrls: ['./spacer.component.scss'],
  standalone: true,
  imports: [
    KitLayoutModule,
    CodeBlockComponent,
    KitTextModule,
    SimpleTableComponent
  ],
})
export class SpacerComponent {
  importModule = `import { KitLayoutModule } from ' @openkit-labs/ngx-kit-ui';`;
  importComponent = `import { KitSpacerComponent } from ' @openkit-labs/ngx-kit-ui';`;
  usage = `<kit-row>
  <kit-text-body>Item 1</kit-text-body>
  <kit-spacer></kit-spacer>
  <kit-text-body>Item 2</kit-text-body>
</kit-row>`;

  inputsDefinition = [
    { title: 'Input', lookupField: 'input' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];
  inputsDataset = [
    { input: 'flex', type: 'number', default: "1", description: 'The flex factor to apply to the spacer.' },
    { input: 'size', type: 'SpacingValue', default: "16", description: 'Fixed size value that determines the size of this spacer.' },
  ];
}
