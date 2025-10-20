import { Component } from '@angular/core';
import { KitButtonModule, KitLayoutModule, KitTextModule, SimpleTableComponent } from '../../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../../shared/code-block/code-block.component';

@Component({
  selector: 'app-round-buttons',
  standalone: true,
  imports: [KitLayoutModule, KitButtonModule, KitTextModule, CodeBlockComponent, SimpleTableComponent],
  templateUrl: './round-buttons.component.html',
  styleUrls: ['./round-buttons.component.scss']
})
export class RoundButtonsComponent {
  importModule = `import { KitButtonModule } from ' @openkit-labs/ngx-kit-ui';`;
  importComponent = `import { KitRoundButtonComponent } from ' @openkit-labs/ngx-kit-ui';`;
  usage = `<kit-round-button color="primary"></kit-round-button>`;

  // Inputs Table
  inputsDefinition = [
    { title: 'Input', lookupField: 'input' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];
  inputsDataset = [
    { input: 'color', type: 'ButtonColor', default: "'primary'", description: "The button's color scheme." },
    { input: 'disabled', type: 'boolean', default: 'false', description: 'Whether the button is disabled.' },
    { input: 'outline', type: 'boolean', default: 'false', description: 'Whether to apply the outline style to the button.' }
  ];

  // Outputs Table
  outputsDefinition = [
    { title: 'Output', lookupField: 'output' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Description', lookupField: 'description' }
  ];
  outputsDataset = [
    { output: 'clicked', type: 'EventEmitter<void>', description: 'Emitted when the button is clicked.' }
  ];
  // Styling Variables Table
  stylingDefinition = [
    { title: 'Variable', lookupField: 'variable' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];
  stylingDataset = [
    { variable: '--kit-round-button-size', default: '40px', description: 'Width and height of the round button.' },
    { variable: '--kit-round-button-margin', default: '0', description: 'Margin around the round button.' },
    { variable: '--kit-round-button-font-size', default: '16px', description: 'Font size of the content inside the round button.' },
    { variable: '--kit-button-font-weight', default: '500', description: 'Font weight of the round button text or icon.' },
    { variable: '--kit-button-disabled-opacity', default: '0.6', description: 'Opacity applied when the round button is disabled.' },
  ];
}