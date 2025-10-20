import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KitInputModule, SimpleTableComponent, KitLayoutModule, KitTextModule } from '../../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../../shared/code-block/code-block.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-number',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, KitInputModule, KitLayoutModule, KitTextModule, CodeBlockComponent, SimpleTableComponent, JsonPipe],
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss']
})
export class NumberComponent {
  importModule = `import { KitInputModule } from ' @openkit-labs/ngx-kit-ui';`;
  importComponent = `import { KitInputNumberComponent } from ' @openkit-labs/ngx-kit-ui';`;
  usage = `<kit-input-number title="Quantity" placeholder="Enter a number" [(ngModel)]="quantity"></kit-input-number>`;

  basicValue: number | null = null;
  requiredValue: number | null = null;

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
    { input: 'value', type: 'number | null', default: 'null', description: 'The current value of the input.' },
    { input: 'min', type: 'number', default: 'null', description: 'The minimum value allowed.' },
    { input: 'max', type: 'number', default: 'null', description: 'The maximum value allowed.' },
    { input: 'step', type: 'number', default: '1', description: 'The step interval for increasing/decreasing the value.' }
  ];

  // Outputs Table
  outputsDefinition = [
    { title: 'Output', lookupField: 'output' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Description', lookupField: 'description' }
  ];
  outputsDataset = [
    { output: 'valueChange', type: 'EventEmitter<number | null>', description: 'Emitted when the input value changes.' },
    { output: 'focus', type: 'EventEmitter<FocusEvent>', description: 'Emitted when the input is focused.' },
    { output: 'blur', type: 'EventEmitter<FocusEvent>', description: 'Emitted when the input loses focus.' },
    { output: 'paste', type: 'EventEmitter<string>', description: 'Emitted when the user pastes content into the input.' }
  ];

  // Styling Variables Table
  stylingDefinition = [
    { title: 'Variable', lookupField: 'variable' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];
  stylingDataset = [
    { variable: '--kit-input-padding', default: '12px 16px', description: 'Padding inside the number input field.' },
    { variable: '--kit-input-font-size', default: '1rem', description: 'Font size of the number input text.' },
    { variable: '--kit-input-line-height', default: '1.5', description: 'Line height of the number input text.' },
    { variable: '--kit-input-text-color', default: '#212529', description: 'Text color of the number input.' },
    { variable: '--kit-input-background-color', default: '#e8e8e8', description: 'Background color of the number input.' },
    { variable: '--kit-input-border-width', default: '2px', description: 'Border width of the number input.' },
    { variable: '--kit-input-border-color', default: 'transparent', description: 'Default border color of the number input.' },
    { variable: '--kit-input-border-radius', default: '16px', description: 'Border radius of the number input.' },
    { variable: '--kit-input-placeholder-color', default: 'var(--kit-text-color-secondary, #6c757d)', description: 'Color of the placeholder text in the number input.' },
    { variable: '--kit-input-focus-border-color', default: 'var(--kit-color-primary, #0066cc)', description: 'Border color of the number input on focus.' },
    { variable: '--kit-input-error-border-color', default: 'var(--kit-color-danger, #dc3545)', description: 'Border color when the number input has an error.' },
    { variable: '--kit-input-error-background-color', default: '#fce8ea', description: 'Background color when the number input has an error.' },
    { variable: '--kit-input-disabled-background-color', default: '#f5f5f5', description: 'Background color of the disabled number input.' },
    { variable: '--kit-input-disabled-text-color', default: 'var(--kit-text-color-muted, #adb5bd)', description: 'Text color of the disabled number input.' },
    { variable: '--kit-input-disabled-placeholder-color', default: 'var(--kit-text-color-muted, #adb5bd)', description: 'Placeholder color of the disabled number input.' },
    { variable: '--kit-text-color-secondary', default: '#6c757d', description: 'Secondary text color used as fallback for placeholder text.' },
    { variable: '--kit-text-color-muted', default: '#adb5bd', description: 'Muted text color used for disabled input and placeholder.' },
    { variable: '--kit-color-primary', default: '#0066cc', description: 'Primary color used for focus state of input.' },
    { variable: '--kit-color-danger', default: '#dc3545', description: 'Danger color used for error state of input.' },
  ];


  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      quantity: [null, [Validators.required]]
    });
  }
}