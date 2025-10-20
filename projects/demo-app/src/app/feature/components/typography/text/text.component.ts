import { Component } from '@angular/core';
import { KitLayoutModule, KitTextModule, SimpleTableComponent } from '../../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../../shared/code-block/code-block.component';

@Component({
  selector: 'app-text',
  standalone: true,
  imports: [KitLayoutModule, KitTextModule, CodeBlockComponent, SimpleTableComponent],
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent {
  importModule = `import { InputModule } from ' @openkit-labs/ngx-kit-ui';`;
  importComponent = `import { InputTextComponent } from ' @openkit-labs/ngx-kit-ui';`;
  usage = `<kit-input-text title="Name" placeholder="Enter your name" [(ngModel)]="textValue"></kit-input-text>`;

  // Values for examples
  textValue: string = '';
  requiredTextValue: string = '';
  usernameValue: string = '';
  disabledTextValue: string = 'prefilled text';
  errorTextValue: string = 'invalid email';

  // Inputs Table
  inputsDefinition = [
    { title: 'Input', lookupField: 'input' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];
  inputsDataset = [
    { input: 'color', type: "'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'muted'", default: "''", description: 'Text color of the input field.' },
    { input: 'align', type: "'left' | 'center' | 'right' | 'justify'", default: "''", description: 'Text alignment of the input field.' },
    { input: 'weight', type: "'light' | 'normal' | 'medium' | 'bold' | number", default: "''", description: 'Font weight of the input text.' },
    { input: 'decoration', type: "'none' | 'underline' | 'line-through' | 'overline'", default: "''", description: 'Text decoration of the input text.' },
    { input: 'margin', type: 'string', default: "''", description: 'Text margin of the input field.' },
    { input: 'wrap', type: 'boolean', default: "true", description: 'Text wrapping of the input field.' },
    { input: 'ellipses', type: 'boolean', default: "false", description: 'Text ellipses of the input field.' },
    { input: 'lines', type: 'number', default: "0", description: 'Text max lines the text can wrap to' },
    { input: 'italic', type: 'boolean', default: "false", description: 'Text italic of the input field.' },
  ];

  // Outputs Table
  outputsDefinition = [
    { title: 'Output', lookupField: 'output' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Description', lookupField: 'description' }
  ];
  outputsDataset = [
    { output: 'valueChange', type: 'EventEmitter<string>', description: 'Emitted when the input value changes.' }
  ];

  // Styling Variables Table
  stylingDefinition = [
    { title: 'Variable', lookupField: 'variable' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];
  stylingDataset = [
    {
      variable: '--kit-font-size-body',
      default: '1rem',
      description: 'Base font size for body text.'
    },
    {
      variable: '--kit-font-weight-body',
      default: '400',
      description: 'Default font weight for body text.'
    },
    {
      variable: '--kit-line-height-body',
      default: '1.5',
      description: 'Line height for body text.'
    },
    {
      variable: '--kit-text-color-primary',
      default: '#212529',
      description: 'Primary text color for body paragraphs.'
    },
    {
      variable: '--kit-color-primary',
      default: '#0066cc',
      description: 'Primary semantic color used for text with the primary class.'
    },
    {
      variable: '--kit-color-secondary',
      default: '#6c757d',
      description: 'Secondary semantic color used for text with the secondary class.'
    },
    {
      variable: '--kit-color-success',
      default: '#28a745',
      description: 'Success semantic color used for text with the success class.'
    },
    {
      variable: '--kit-color-info',
      default: '#17a2b8',
      description: 'Info semantic color used for text with the info class.'
    },
    {
      variable: '--kit-color-warning',
      default: '#ffc107',
      description: 'Warning semantic color used for text with the warning class.'
    },
    {
      variable: '--kit-color-danger',
      default: '#dc3545',
      description: 'Danger semantic color used for text with the danger class.'
    },
    {
      variable: '--kit-text-color-muted',
      default: '#adb5bd',
      description: 'Muted text color used for less prominent text.'
    }
  ];

}