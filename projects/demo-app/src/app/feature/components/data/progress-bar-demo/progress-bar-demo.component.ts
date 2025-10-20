import { Component } from '@angular/core';
import { CodeBlockComponent } from '../../../../shared/code-block/code-block.component';

import {
  KitLayoutModule,
  KitTextModule,
  KitProgressBarComponent,
  KitDataModule, SimpleTableComponent
} from '../../../../../../../ngx-kit-ui/src/public-api';

@Component({
  selector: 'app-progress-bar-demo',
  templateUrl: './progress-bar-demo.component.html',
  styleUrls: ['./progress-bar-demo.component.scss'],
  standalone: true,
  imports: [
    KitLayoutModule,
    CodeBlockComponent,
    KitTextModule,
    KitDataModule,
    KitProgressBarComponent,
    SimpleTableComponent
  ],
})
export class ProgressBarDemoComponent {
  importModule = `import { KitDataModule } from ' @openkit-labs/ngx-kit-ui';`;
  importComponent = `import { ProgressBarComponent } from ' @openkit-labs/ngx-kit-ui';`;
  usage = `<kit-progress-bar [value]="progress"></kit-progress-bar>`;

  inputsDefinition = [
    { title: 'Input', lookupField: 'input' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];
  inputsDataset = [
    { input: 'value', type: 'number', default: "0", description: 'The progress value from 0 to 100.' },
  ];

  stylingDefinition = [
    { title: 'Variable', lookupField: 'variable' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];
  stylingDataset = [
    { variable: '--kit-progress-bar-height', default: '8px', description: 'Height of the progress bar container.' },
    { variable: '--kit-progress-bar-background-color', default: '#e5e7eb', description: 'Background color of the progress bar track.' },
    { variable: '--kit-progress-bar-border-radius', default: '8px', description: 'Border radius of the progress bar container.' },
    { variable: '--kit-progress-bar-progress-color', default: '#3b82f6', description: 'Color of the filled portion of the progress bar.' },
  ];

  progress = 50;
}
