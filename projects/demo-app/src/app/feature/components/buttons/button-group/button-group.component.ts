import { Component } from '@angular/core';
import { KitButtonModule, KitLayoutModule, KitTextModule, SimpleTableComponent } from '../../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../../shared/code-block/code-block.component';

@Component({
  selector: 'app-button-group',
  standalone: true,
  imports: [KitLayoutModule, KitButtonModule, KitTextModule, CodeBlockComponent, SimpleTableComponent],
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss']
})
export class ButtonGroupComponent {
  importModule = `import { KitButtonModule } from ' @openkit-labs/ngx-kit-ui';`;
  importComponent = `import { KitButtonGroupComponent, KitButtonGroupItemComponent } from ' @openkit-labs/ngx-kit-ui';`;
  usage = `<kit-button-group>
  <kit-button-group-item>Button 1</kit-button-group-item>
  <kit-button-group-item>Button 2</kit-button-group-item>
</kit-button-group>`;

  // Inputs Table
  inputsDefinition = [
    { title: 'Input', lookupField: 'input' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];
  inputsDataset = [
    { input: 'orientation', type: 'ButtonGroupOrientation', default: "'horizontal'", description: "The button group's orientation." },
    { input: 'selectionMode', type: 'ButtonGroupSelectionMode', default: "'single'", description: 'The selection mode of the button group.' },
  ];

  // Outputs Table
  outputsDefinition = [
    { title: 'Output', lookupField: 'output' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Description', lookupField: 'description' }
  ];
  outputsDataset = [
    { output: 'clicked', type: 'EventEmitter<void>', description: 'Emitted when a button is clicked.' }
  ];

  // Styling Variables Table
  stylingDefinition = [
    { title: 'Variable', lookupField: 'variable' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];
  stylingDataset = [
    { variable: '--kit-button-group-border-radius', default: '12px', description: 'Border radius for button group container.' },
    { variable: '--kit-button-group-border-width', default: '2px', description: 'Border width for the button group.' },
  ];
}