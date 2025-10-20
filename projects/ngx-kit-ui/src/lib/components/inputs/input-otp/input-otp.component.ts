import { Component, Input, Optional, Self } from '@angular/core';
import { KitBaseInputComponent } from '../base/base-input.component';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'kit-input-otp',
  templateUrl: './input-otp.component.html',
  styleUrls: ['./input-otp.component.scss'],
  standalone: true,
  imports: []
})
export class KitInputOtpComponent extends KitBaseInputComponent<string> {

  /** The length of the OTP code */
  @Input() length: number = 5;

  // No programmatic focus handling — this component keeps inputs simple and
  // delegates focus/touch behaviour to the parent / the browser.

  /**
   * Array to store the individual OTP digits
   */
  otpDigits: string[] = [];

  constructor(@Optional() @Self() ngControl: NgControl | null = null) {
    super(ngControl);
    this.initializeOtpDigits();
  }

  /**
   * Initialize the OTP digits array
   */
  private initializeOtpDigits(): void {
    this.otpDigits = Array(this.length).fill('');
  }

  /**
   * Handle input event for each digit
   */
  handleInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Only allow single digit or empty string
    if (value.length > 1) {
      value = value.charAt(0);
      input.value = value;
    }

    this.otpDigits[index] = value;
    this.updateValue();

  }


  /**
   * Override writeValue so the component reflects programmatic form updates.
   * Splits the incoming string into individual digits and fills/trim to length.
   */
  override writeValue(value: string): void {
    // Use base implementation to keep this.value in sync
    super.writeValue(value as unknown as any);

    const str = value ?? '';
    const chars = str.split('');
    // Fill otpDigits up to `length` with the split chars or empty strings
    this.otpDigits = Array.from({ length: this.length }, (_, i) => chars[i] ?? '');
  }

  /**
   * Update the overall OTP value and emit it
   */
  private updateValue(): void {
    const newVal = this.otpDigits.join('');
    // Use base class helper so ControlValueAccessor and outputs are handled
    this.onValueChange(newVal as unknown as string);
  }

  protected getComponentPrefix(): string {
    return 'input-otp';
  }

  protected override getDefaultValue(): string {
    return '';
  }
}