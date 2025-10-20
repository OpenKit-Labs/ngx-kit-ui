import { Component } from '@angular/core';
import { KitButtonModule, KitLayoutModule, KitTextModule, SimpleTableComponent } from '../../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../../shared/code-block/code-block.component';
import { NgIcon } from "@ng-icons/core";

@Component({
  selector: 'app-floating-action-buttons',
  standalone: true,
  imports: [KitLayoutModule, KitButtonModule, KitTextModule, CodeBlockComponent, SimpleTableComponent, NgIcon],
  templateUrl: './floating-action-buttons.component.html',
  styleUrls: ['./floating-action-buttons.component.scss']
})
export class FloatingActionButtonsComponent {
  importModule = `import { KitButtonModule } from ' @openkit-labs/ngx-kit-ui';`;
  importComponent = `import { KitFloatingActionButtonComponent } from ' @openkit-labs/ngx-kit-ui';`;
  usage = `<kit-button-floating-action color="primary"></kit-button-floating-action>`;

  // Inputs Table
  inputsDefinition = [
    { title: 'Input', lookupField: 'input' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];
  inputsDataset = [
    { input: 'position', type: 'FloatingActionButtonPosition', default: "'bottom-right'", description: 'The position of the floating action button.' },
    { input: 'color', type: 'ButtonColor', default: "'primary'", description: "The button's color scheme." },
    { input: 'disabled', type: 'boolean', default: 'false', description: 'Whether the button is disabled.' },
    { input: 'outline', type: 'boolean', default: 'false', description: 'Whether to apply the outline style to the button.' },
    { input: 'zIndex', type: 'number', default: '1000', description: 'Z-index of the floating action button.' }
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
    { variable: '--kit-floating-action-button-margin', default: '16px', description: 'Margin around the floating action button.' },
    { variable: '--kit-floating-action-button-shadow', default: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))', description: 'Shadow filter for the floating action button.' },
    { variable: '--kit-floating-action-button-size', default: '56px', description: 'Width and height of the floating action button.' },
    { variable: '--kit-floating-action-button-font-size', default: '18px', description: 'Font size of the icon/text inside the floating action button.' },
    { variable: '--kit-z-overlay', default: '1000', description: 'Z-index used for overlay positioning of the floating action button.' },
    { variable: '--kit-button-font-weight', default: '500', description: 'Font weight of the floating action button text or icon.' },
    { variable: '--kit-button-disabled-opacity', default: '0.6', description: 'Opacity for disabled floating action buttons.' },
  ];

  constructor() {
  }
}
