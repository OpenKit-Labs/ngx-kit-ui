import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KitInputModule, KitLayoutModule, KitTextModule, SimpleTableComponent } from '../../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../../shared/code-block/code-block.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-text',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, KitInputModule, KitLayoutModule, KitTextModule, CodeBlockComponent, SimpleTableComponent, JsonPipe],
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent {
  importModule = `import { KitInputModule } from ' @openkit-labs/ngx-kit-ui';`;
  importComponent = `import { KitInputTextComponent } from ' @openkit-labs/ngx-kit-ui';`;
  usage = `<kit-input-text title="Name" placeholder="Enter your name" [(ngModel)]="textValue"></kit-input-text>`;

  // Values for examples
  basicValue: string = '';
  requiredValue: string = '';

  // Reactive Form
  form: FormGroup;

  // Inputs Table
  inputsDefinition = [
    { title: 'Input', lookupField: 'input' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];
  inputsDataset = [
    { input: 'title', type: 'string', default: "''", description: 'Text that appears above the input field as a label.' },
    { input: 'placeholder', type: 'string', default: "''", description: 'Placeholder text that appears in the input when empty.' },
    { input: 'required', type: 'boolean', default: 'false', description: 'Whether the field is required (shows required indicator).' },
    { input: 'disabled', type: 'boolean', default: 'false', description: 'Whether the input is disabled.' },
    { input: 'helperText', type: 'string', default: "''", description: 'Text that appears below the input field for additional information.' },
    { input: 'errorMessage', type: 'string | null', default: 'null', description: 'Error message text that appears below the input in danger color.' },
    { input: 'error', type: 'boolean', default: 'false', description: 'Whether the input is in an error state (adds error styling).' },
    { input: 'id', type: 'string', default: "''", description: 'Unique identifier for the input element.' },
    { input: 'name', type: 'string', default: "''", description: 'Name attribute for form control binding.' },
    { input: 'value', type: 'string', default: "''", description: 'The current value of the input.' },
    { input: 'autoFocus', type: 'boolean', default: 'false', description: 'Whether the input should be focused automatically on initialization.' },
    { input: 'isFocused', type: 'boolean', default: 'false', description: 'Two-way binding for the focus state of the input.' }
  ];

  // Outputs Table
  outputsDefinition = [
    { title: 'Output', lookupField: 'output' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Description', lookupField: 'description' }
  ];
  outputsDataset = [
    { output: 'valueChange', type: 'EventEmitter<string>', description: 'Emitted when the input value changes.' },
    { output: 'isFocusedChange', type: 'EventEmitter<boolean>', description: 'Emitted when the focus state of the input changes.' },
    { output: 'paste', type: 'EventEmitter<string>', description: 'Emitted when the user pastes content into the input.' }
  ];

  // Styling Variables Table
  stylingDefinition = [
    { title: 'Variable', lookupField: 'variable' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];
  stylingDataset = [
    { variable: '--kit-input-padding', default: '12px 16px', description: 'Padding for text input fields.' },
    { variable: '--kit-input-font-size', default: '1rem', description: 'Font size for text input content.' },
    { variable: '--kit-input-line-height', default: '1.5', description: 'Line height for text input content.' },
    { variable: '--kit-input-text-color', default: '#212529', description: 'Text color for text input.' },
    { variable: '--kit-input-background-color', default: '#e8e8e8', description: 'Background color for text input.' },
    { variable: '--kit-input-border-width', default: '2px', description: 'Border width for text input.' },
    { variable: '--kit-input-border-color', default: 'transparent', description: 'Border color for text input.' },
    { variable: '--kit-input-border-radius', default: '16px', description: 'Border radius for text input.' },
    { variable: '--kit-input-placeholder-color', default: 'var(--kit-text-color-secondary, #6c757d)', description: 'Placeholder text color for text input.' },
    { variable: '--kit-text-color-secondary', default: '#6c757d', description: 'Secondary text color used for placeholders and subtle elements.' },
    { variable: '--kit-input-focus-border-color', default: 'var(--kit-color-primary, #0066cc)', description: 'Border color when text input is focused.' },
    { variable: '--kit-color-primary', default: '#0066cc', description: 'Primary color used for focus and interactive elements.' },
    { variable: '--kit-input-error-border-color', default: 'var(--kit-color-danger, #dc3545)', description: 'Border color when text input has an error.' },
    { variable: '--kit-color-danger', default: '#dc3545', description: 'Danger color used for errors and alerts.' },
    { variable: '--kit-input-error-background-color', default: '#fce8ea', description: 'Background color when text input has an error.' },
    { variable: '--kit-input-disabled-background-color', default: '#f5f5f5', description: 'Background color when text input is disabled.' },
    { variable: '--kit-input-disabled-text-color', default: 'var(--kit-text-color-muted, #adb5bd)', description: 'Text color when text input is disabled.' },
    { variable: '--kit-input-disabled-placeholder-color', default: 'var(--kit-text-color-muted, #adb5bd)', description: 'Placeholder color when text input is disabled.' },
    { variable: '--kit-text-color-muted', default: '#adb5bd', description: 'Muted text color used for disabled or secondary states.' }
  ];


  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required]]
    });
  }
}
