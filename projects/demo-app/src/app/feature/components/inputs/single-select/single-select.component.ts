import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';

import { KitInputModule, KitInputSelectComponent, SimpleTableComponent, KitLayoutModule, KitOverlaysModule, KitTextModule, KitSelectItemDirective, KitSelectItemActiveDirective } from '../../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../../shared/code-block/code-block.component';

@Component({
  selector: 'app-single-select',
  standalone: true,
  imports: [FormsModule, KitLayoutModule, KitTextModule, CodeBlockComponent, SimpleTableComponent, KitInputModule, ReactiveFormsModule, KitInputSelectComponent, KitOverlaysModule, KitSelectItemDirective, KitSelectItemActiveDirective, JsonPipe],
  templateUrl: './single-select.component.html',
  styleUrls: ['./single-select.component.scss']
})
export class SingleSelectComponent {
  importModule = `import { KitInputModule } from ' @openkit-labs/ngx-kit-ui';`;
  importComponent = `import { KitInputSelectComponent } from ' @openkit-labs/ngx-kit-ui';`;
  usage = `<kit-input-select title="Select an Option" placeholder="Choose an item" [options]="options" [(value)]="selectedValue"></kit-input-select>

<!-- With Search -->
<kit-input-select title="Select a User" [options]="users" [showSearch]="true" [(value)]="selectedValue"></kit-input-select>

<!-- With Custom Templates -->
<kit-input-select title="Select a User" [options]="users" [(value)]="selectedValue">
  <!-- Template for selected item -->
  <ng-template kit-select-item-active let-option="option">
    <div>{{ option.name }} ({{ option.id }})</div>
  </ng-template>
  
  <!-- Template for dropdown options -->
  <ng-template kit-select-item let-option="option" let-isSelected="isSelected">
    <div>{{ option.name }} <span *ngIf="isSelected">✓</span></div>
  </ng-template>
</kit-input-select>`;

  options = ['Option A', 'Option B', 'Option C'];
  users = [
    { id: 1, name: 'Alice', title: 'Developer' },
    { id: 2, name: 'Bob', title: 'Designer' },
    { id: 3, name: 'Charlie', title: 'Manager' }
  ];
  selectedValue: string | null = null;
  // Basic example value (parity with text demo)
  basicValue: string | null = null;
  requiredValue: string | null = null;
  helperTextValue: string | null = null;
  searchValue: any = null;
  disabledValue: string | null = 'Option B';
  errorValue: string | null = null;
  customDisplayValue: any = this.users[0];
  customTemplateValue: any = this.users[1];

  // Reactive form
  form: FormGroup;

  // Inputs Table
  inputsDefinition = [
    { title: 'Input', lookupField: 'input' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];
  inputsDataset = [
    { input: 'title', type: 'string', default: "''", description: 'Text that appears above the select as a label.' },
    { input: 'placeholder', type: 'string', default: "''", description: 'Placeholder text that appears in the select when empty.' },
    { input: 'required', type: 'boolean', default: 'false', description: 'Whether the field is required (shows required indicator).' },
    { input: 'disabled', type: 'boolean', default: 'false', description: 'Whether the select is disabled.' },
    { input: 'helperText', type: 'string', default: "''", description: 'Text that appears below the select for additional information.' },
    { input: 'errorMessage', type: 'string | null', default: 'null', description: 'Error message text that appears below the select in danger color.' },
    { input: 'error', type: 'boolean', default: 'false', description: 'Whether the select is in an error state (adds error styling).' },
    { input: 'id', type: 'string', default: "''", description: 'Unique identifier for the select element.' },
    { input: 'name', type: 'string', default: "''", description: 'Name attribute for form control binding.' },
    { input: 'value', type: 'any', default: 'null', description: 'The current value of the select.' },
    { input: 'options', type: 'any[]', default: '[]', description: 'An array of options to display in the select.' },
    { input: 'matchField', type: 'string', default: 'id', description: 'The property name to use for matching option values.' },
    { input: 'displayField', type: 'string', default: 'name', description: 'The property name to use for displaying option text.' },
    { input: 'dialogTitle', type: 'string', default: 'Select an option', description: 'The title of the dialog or bottom sheet.' },
    { input: 'showSearch', type: 'boolean', default: 'false', description: 'Whether to show a search box at the top of the options list.' }
  ];

  // Custom Template Directives
  directivesDefinition = [
    { title: 'Directive', lookupField: 'directive' },
    { title: 'Template Variables', lookupField: 'variables' },
    { title: 'Description', lookupField: 'description' }
  ];
  directivesDataset = [
    { directive: 'kit-select-item-active', variables: 'option: T', description: 'Template for rendering the selected item in the input field.' },
    { directive: 'kit-select-item', variables: 'option: T, isSelected: boolean', description: 'Template for rendering each option in the dropdown/dialog.' }
  ];

  // Outputs Table
  outputsDefinition = [
    { title: 'Output', lookupField: 'output' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Description', lookupField: 'description' }
  ];
  outputsDataset = [
    { output: 'valueChange', type: 'EventEmitter<any>', description: 'Emitted when the select value changes.' }
  ];

  // Styling Variables Table
  stylingDefinition = [
    { title: 'Variable', lookupField: 'variable' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];
  stylingDataset = [
    { variable: '--kit-input-padding', default: '12px 16px', description: 'Padding for select input fields.' },
    { variable: '--kit-input-font-size', default: '1rem', description: 'Font size for select input text.' },
    { variable: '--kit-input-line-height', default: '1.5', description: 'Line height for select input text.' },
    { variable: '--kit-input-text-color', default: '#212529', description: 'Text color for select input.' },
    { variable: '--kit-input-background-color', default: '#e8e8e8', description: 'Background color for select input.' },
    { variable: '--kit-input-border-width', default: '2px', description: 'Border width for select input.' },
    { variable: '--kit-input-border-color', default: 'transparent', description: 'Border color for select input.' },
    { variable: '--kit-input-border-radius', default: '16px', description: 'Border radius for select input.' },
    { variable: '--kit-input-placeholder-color', default: 'var(--kit-text-color-secondary, #6c757d)', description: 'Placeholder text color for select input.' },
    { variable: '--kit-text-color-secondary', default: '#6c757d', description: 'Secondary text color used for placeholders and subtle text.' },
    { variable: '--kit-input-focus-border-color', default: 'var(--kit-color-primary, #0066cc)', description: 'Border color when select input is focused.' },
    { variable: '--kit-color-primary', default: '#0066cc', description: 'Primary color used for focused and selected states.' },
    { variable: '--kit-input-error-border-color', default: 'var(--kit-color-danger, #dc3545)', description: 'Border color when select input has an error.' },
    { variable: '--kit-color-danger', default: '#dc3545', description: 'Danger color used for errors and warnings.' },
    { variable: '--kit-input-error-background-color', default: '#fce8ea', description: 'Background color when select input has an error.' },
    { variable: '--kit-input-disabled-background-color', default: '#f5f5f5', description: 'Background color when select input is disabled.' },
    { variable: '--kit-input-disabled-text-color', default: 'var(--kit-text-color-muted, #adb5bd)', description: 'Text color when select input is disabled.' },
    { variable: '--kit-input-disabled-placeholder-color', default: 'var(--kit-text-color-muted, #adb5bd)', description: 'Placeholder color when select input is disabled.' },
    { variable: '--kit-text-color-muted', default: '#adb5bd', description: 'Muted text color used for disabled and secondary elements.' },
    { variable: '--kit-select-item-padding', default: '12px 16px', description: 'Padding for each selectable item in the dropdown.' },
    { variable: '--kit-select-item-font-size', default: 'var(--kit-font-size-body, 1rem)', description: 'Font size for dropdown select items.' },
    { variable: '--kit-font-size-body', default: '1rem', description: 'Base font size for body text across UI components.' },
    { variable: '--kit-select-item-text-color', default: 'var(--kit-text-color-primary, #212529)', description: 'Text color for select item text.' },
    { variable: '--kit-text-color-primary', default: '#212529', description: 'Primary text color for readable content.' },
    { variable: '--kit-select-item-background-color', default: 'transparent', description: 'Background color for select items.' },
    { variable: '--kit-select-item-border-radius', default: '14px', description: 'Border radius for select items.' },
    { variable: '--kit-select-item-hover-background-color', default: 'rgba(0, 102, 204, 0.1)', description: 'Background color when hovering over a select item.' },
    { variable: '--kit-select-item-selected-background-color', default: 'var(--kit-color-primary, #0066cc)', description: 'Background color for a selected select item.' },
    { variable: '--kit-select-item-selected-text-color', default: '#ffffff', description: 'Text color for a selected select item.' },
    { variable: '--kit-select-item-selected-border-radius', default: '14px', description: 'Border radius for a selected select item.' },
    { variable: '--kit-select-item-check-color', default: '#ffffff', description: 'Color of the checkmark indicating selected items.' }
  ];


  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      user: [null, [Validators.required]]
    });
  }
}