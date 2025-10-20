import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KitInputModule, SimpleTableComponent, KitLayoutModule, KitTextModule } from '../../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../../shared/code-block/code-block.component';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, KitInputModule, KitLayoutModule, KitTextModule, CodeBlockComponent, SimpleTableComponent],
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent {
  importModule = `import { KitInputModule } from ' @openkit-labs/ngx-kit-ui';`;
  importComponent = `import { KitInputOtpComponent } from ' @openkit-labs/ngx-kit-ui';`;
  usage = `<kit-input-otp [length]="6" [(ngModel)]="otpValue"></kit-input-otp>`;

  basicValue: string = '';
  requiredValue: string = '';

  form: FormGroup;

  // Inputs Table
  inputsDefinition = [
    { title: 'Input', lookupField: 'input' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];
  inputsDataset = [
    { input: 'length', type: 'number', default: '4', description: 'The number of OTP input fields to display.' },
    { input: 'disabled', type: 'boolean', default: 'false', description: 'Whether the OTP input is disabled.' },
    { input: 'error', type: 'boolean', default: 'false', description: 'Whether the OTP input is in an error state.' },
    { input: 'value', type: 'string', default: "''", description: 'The current value of the OTP input.' }
  ];

  // Outputs Table
  outputsDefinition = [
    { title: 'Output', lookupField: 'output' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Description', lookupField: 'description' }
  ];
  outputsDataset = [
    { output: 'valueChange', type: 'EventEmitter<string>', description: 'Emitted when the OTP value changes.' }
  ];

  // Styling Variables Table
  stylingDefinition = [
    { title: 'Variable', lookupField: 'variable' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];
  stylingDataset = [
    { variable: '--kit-input-font-size', default: '1rem', description: 'Font size for OTP input digits.' },
    { variable: '--kit-input-line-height', default: '1.5', description: 'Line height for OTP input digits.' },
    { variable: '--kit-input-text-color', default: '#212529', description: 'Text color for OTP input digits.' },
    { variable: '--kit-input-background-color', default: '#e8e8e8', description: 'Background color for OTP input digits.' },
    { variable: '--kit-input-border-width', default: '2px', description: 'Border width for OTP input digits.' },
    { variable: '--kit-input-border-color', default: 'transparent', description: 'Border color for OTP input digits.' },
    { variable: '--kit-input-border-radius', default: '16px', description: 'Border radius for OTP input digits.' },
    { variable: '--kit-color-primary', default: '#0066cc', description: 'Primary color used for caret and focus border.' },
    { variable: '--kit-input-focus-border-color', default: 'var(--kit-color-primary, #0066cc)', description: 'Border color when OTP input is focused.' },
    { variable: '--kit-input-error-border-color', default: 'var(--kit-color-danger, #dc3545)', description: 'Border color when OTP input has an error.' },
    { variable: '--kit-color-danger', default: '#dc3545', description: 'Danger color used for errors.' },
    { variable: '--kit-input-error-background-color', default: '#fce8ea', description: 'Background color when OTP input has an error.' },
    { variable: '--kit-input-disabled-background-color', default: '#f5f5f5', description: 'Background color when OTP input is disabled.' },
    { variable: '--kit-input-disabled-text-color', default: 'var(--kit-text-color-muted, #adb5bd)', description: 'Text color when OTP input is disabled.' },
    { variable: '--kit-text-color-muted', default: '#adb5bd', description: 'Muted text color used for disabled inputs.' }
  ];


  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      otp: ['', [Validators.required]]
    });
  }
}