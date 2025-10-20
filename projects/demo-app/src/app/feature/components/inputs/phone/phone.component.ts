import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KitInputModule, SimpleTableComponent, KitLayoutModule, KitTextModule } from '../../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../../shared/code-block/code-block.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-phone',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, KitInputModule, KitLayoutModule, KitTextModule, CodeBlockComponent, SimpleTableComponent, JsonPipe],
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss']
})
export class PhoneComponent {
  importModule = `import { KitInputModule } from ' @openkit-labs/ngx-kit-ui';`;
  importComponent = `import { KitInputPhoneComponent } from ' @openkit-labs/ngx-kit-ui';`;
  usage = `<kit-input-phone title="Phone Number" placeholder="Enter your phone number" [(ngModel)]="phoneNumber"></kit-input-phone>`;

  phoneNumber = { countryCode: { id: 'us', name: 'United States', code: '+1', flag: '🇺🇸' }, number: '' };
  requiredPhoneNumber = { countryCode: null, number: '' };
  customPhoneNumber = { countryCode: { id: 'ca', name: 'Canada', code: '+1', flag: '🇨🇦' }, number: '' };
  disabledPhoneNumber = { countryCode: { id: 'uk', name: 'United Kingdom', code: '+44', flag: '🇬🇧' }, number: '1234567890' };

  customCountryCodes = [
    { id: 'ca', name: 'Canada', code: '+1', flag: '🇨🇦' },
    { id: 'fr', name: 'France', code: '+33', flag: '🇫🇷' },
    { id: 'de', name: 'Germany', code: '+49', flag: '🇩🇪' }
  ];

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
    { input: 'value', type: 'PhoneValue', default: "{ countryCode: null, number: '' }", description: 'The current value of the input.' },
    { input: 'countryCodes', type: 'CountryCode[]', default: '[]', description: 'Custom country codes list. If not provided, uses default list.' },
    { input: 'dialogTitle', type: 'string', default: "'Select country'", description: 'Custom title text for the country selection dialog/bottom sheet.' }
  ];

  // Outputs Table
  outputsDefinition = [
    { title: 'Output', lookupField: 'output' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Description', lookupField: 'description' }
  ];
  outputsDataset = [
    { output: 'valueChange', type: 'EventEmitter<PhoneValue>', description: 'Emitted when the input value changes.' }
  ];

  // Styling Variables Table
  stylingDefinition = [
    { title: 'Variable', lookupField: 'variable' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];
  stylingDataset = [
    { variable: '--kit-input-padding', default: '12px 16px', description: 'Padding for phone input fields.' },
    { variable: '--kit-input-font-size', default: '1rem', description: 'Font size for phone input text.' },
    { variable: '--kit-input-line-height', default: '1.5', description: 'Line height for phone input text.' },
    { variable: '--kit-input-text-color', default: '#212529', description: 'Text color for phone input.' },
    { variable: '--kit-input-background-color', default: '#e8e8e8', description: 'Background color for phone input.' },
    { variable: '--kit-input-border-width', default: '2px', description: 'Border width for phone input.' },
    { variable: '--kit-input-border-color', default: 'transparent', description: 'Border color for phone input.' },
    { variable: '--kit-input-border-radius', default: '16px', description: 'Border radius for phone input.' },
    { variable: '--kit-input-placeholder-color', default: 'var(--kit-text-color-secondary, #6c757d)', description: 'Placeholder text color for phone input.' },
    { variable: '--kit-text-color-secondary', default: '#6c757d', description: 'Secondary text color used for placeholders and less prominent text.' },
    { variable: '--kit-input-focus-border-color', default: 'var(--kit-color-primary, #0066cc)', description: 'Border color when phone input is focused.' },
    { variable: '--kit-color-primary', default: '#0066cc', description: 'Primary brand color used for focus and accents.' },
    { variable: '--kit-input-error-border-color', default: 'var(--kit-color-danger, #dc3545)', description: 'Border color when phone input has an error.' },
    { variable: '--kit-color-danger', default: '#dc3545', description: 'Danger color used for errors and warnings.' },
    { variable: '--kit-input-error-background-color', default: '#fce8ea', description: 'Background color when phone input has an error.' },
    { variable: '--kit-input-disabled-background-color', default: '#f5f5f5', description: 'Background color when phone input is disabled.' },
    { variable: '--kit-input-disabled-text-color', default: 'var(--kit-text-color-muted, #adb5bd)', description: 'Text color when phone input is disabled.' },
    { variable: '--kit-input-disabled-placeholder-color', default: 'var(--kit-text-color-muted, #adb5bd)', description: 'Placeholder color when phone input is disabled.' },
    { variable: '--kit-text-color-muted', default: '#adb5bd', description: 'Muted text color for disabled or secondary elements.' },
    { variable: '--kit-select-item-padding', default: '12px 16px', description: 'Padding for each country option in the dropdown.' },
    { variable: '--kit-select-item-border-radius', default: '14px', description: 'Border radius for each country option.' },
    { variable: '--kit-select-item-text-color', default: 'var(--kit-text-color-primary, #212529)', description: 'Text color for country option items.' },
    { variable: '--kit-text-color-primary', default: '#212529', description: 'Primary text color used across components.' },
    { variable: '--kit-select-item-background-color', default: 'transparent', description: 'Background color for country option items.' },
    { variable: '--kit-select-item-hover-background-color', default: 'rgba(0, 102, 204, 0.1)', description: 'Background color when hovering over a country option.' },
    { variable: '--kit-select-item-font-size', default: 'var(--kit-font-size-body, 1rem)', description: 'Font size for country option text.' },
    { variable: '--kit-font-size-body', default: '1rem', description: 'Base font size for body text across components.' },
    { variable: '--kit-input-phone-country-code-font-weight', default: '500', description: 'Font weight for the displayed country code.' },
    { variable: '--kit-input-phone-country-code-text-color', default: 'var(--kit-text-color-secondary, #6c757d)', description: 'Text color for the displayed country code.' },
    { variable: '--kit-input-phone-country-code-background-color', default: '#f5f5f5', description: 'Background color for the country code badge.' },
    { variable: '--kit-input-phone-country-code-border-width', default: '1px', description: 'Border width for the country code badge.' },
    { variable: '--kit-input-phone-country-code-border-color', default: '#e0e0e0', description: 'Border color for the country code badge.' },
    { variable: '--kit-input-phone-country-code-border-radius', default: '8px', description: 'Border radius for the country code badge.' },
    { variable: '--kit-input-phone-country-code-padding', default: '4px 8px', description: 'Padding for the country code badge.' },
    { variable: '--kit-input-phone-country-code-font-size', default: '0.9em', description: 'Font size for the displayed country code.' }
  ];


  // Reactive form
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      phone: [null, [Validators.required]]
    });
  }
}
