import { Component } from '@angular/core';
import { KitButtonModule, KitLayoutModule, KitTextModule, SimpleTableComponent } from '../../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../../shared/code-block/code-block.component';

@Component({
  selector: 'app-text-buttons',
  standalone: true,
  imports: [KitLayoutModule, KitButtonModule, KitTextModule, CodeBlockComponent, SimpleTableComponent],
  templateUrl: './text-buttons.component.html',
  styleUrls: ['./text-buttons.component.scss']
})
export class TextButtonsComponent {
  importModule = `import { KitButtonModule } from ' @openkit-labs/ngx-kit-ui';`;
  importComponent = `import { KitTextButtonComponent } from ' @openkit-labs/ngx-kit-ui';`;
  usage = `<kit-text-button color="primary">Primary</kit-text-button>`;

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
    { input: 'fullWidth', type: 'boolean', default: 'false', description: 'Whether the button should take up the full width of its container.' },
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
    { variable: '--kit-text-button-padding', default: '24px 24px', description: 'Padding inside the text button.' },
    { variable: '--kit-text-button-margin', default: '0', description: 'Margin around the text button.' },
    { variable: '--kit-text-button-font-size', default: '14px', description: 'Font size of the text button content.' },
    { variable: '--kit-text-button-height', default: '40px', description: 'Height of the text button.' },
    { variable: '--kit-button-font-weight', default: '700', description: 'Font weight of the text button content.' },
    { variable: '--kit-button-border-radius', default: '12px', description: 'Border radius of the text button.' },
    { variable: '--kit-button-disabled-opacity', default: '0.6', description: 'Opacity applied when the text button is disabled.' },

  ];
}