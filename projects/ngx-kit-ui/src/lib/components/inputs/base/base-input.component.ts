import { Directive, Input, Output, EventEmitter, OnInit, AfterViewInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

/**
 * Base component class that implements ControlValueAccessor to work with Angular forms.
 * This class provides common functionality for all input components in the kit.
 */
@Directive()
export abstract class KitBaseInputComponent<T = string> implements OnInit, AfterViewInit, ControlValueAccessor {
  /**
   * Common input properties that all input components will have
   */

  // Used for form control binding
  @Input() id: string = '';

  // Used for form control binding
  @Input() name: string = '';

  // Used for disabling the input
  @Input() disabled = false;

  // Used to set the text in the input before the user types anything
  @Input() placeholder = '';

  //Text that appears above the input field
  @Input() title: string = '';

  // Text that appears below the input field, typically for additional information
  @Input() helperText: string = '';

  // Text that appears below the input field, typically for error messages and in danger color
  @Input() errorMessage: string | null = null;

  // Whether the input is in an error state - Adds error class to the input
  @Input() error: boolean = false;

  /**
   * Computed property that returns true if the input should show error state
   * This includes both manual error state and form validation errors
   */
  get hasError(): boolean {
    // Manual error state
    if (this.error) return true;

    // Form validation errors (only show if control is touched)
    if (this.ngControl && this.ngControl.control) {
      return !!(this.ngControl.control.invalid && (this.ngControl.control.touched || this.ngControl.control.dirty));
    }

    return false;
  }

  /**
   * Get the first error message from form validation or use the provided errorMessage
   */
  get effectiveErrorMessage(): string | null {
    // If there's a manual error message, use it
    if (this.errorMessage) return this.errorMessage;

    // Try to get error message from form validation
    if (this.ngControl && this.ngControl.control && this.ngControl.control.errors && this.hasError) {
      const errors = this.ngControl.control.errors;

      // Return specific error messages for common validators
      if (errors['required']) return 'This field is required';
      if (errors['email']) return 'Please enter a valid email address';
      if (errors['minlength']) return `Minimum length is ${errors['minlength'].requiredLength} characters`;
      if (errors['maxlength']) return `Maximum length is ${errors['maxlength'].requiredLength} characters`;
      if (errors['pattern']) return 'Please enter a valid format';

      // Return the first error key if no specific message is available
      return `Invalid ${Object.keys(errors)[0]}`;
    }

    return null;
  }

  /**
   * Support for direct two-way binding with [(value)]
   */
  @Input() value: T;
  @Output() valueChange = new EventEmitter<T>();

  @Input() autoFocus: boolean = false;

  /**
   * Two-way binding for focus state
   */
  private _isFocused: boolean = false;
  private _programmaticChange: boolean = false;

  @Input()
  get isFocused(): boolean {
    return this._isFocused;
  }

  set isFocused(value: boolean) {
    if (this._programmaticChange) {
      return;
    }
    const previousValue = this._isFocused;
    this._isFocused = value;
    if (value !== previousValue) {
      this.handleFocusChange(value);
    }
  }

  /**
   * Output for two-way binding with isFocused
   */
  @Output() isFocusedChange = new EventEmitter<boolean>();

  /**
   * Internal state
   */
  protected touched = false;

  constructor(@Optional() @Self() public ngControl: NgControl | null = null) {
    this.value = this.getDefaultValue();

    // Set the value accessor to this component instance
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    if (!this.id) {
      this.id = this.generateId();
    }
  }

  ngAfterViewInit(): void {
    const inputElement = document.getElementById(this.id) as HTMLInputElement | null;
    if (inputElement && this.autoFocus) {
      setTimeout(() => {
        inputElement.focus();
      }, 150);
    }
  }

  /**
   * Handle focus event on the input element
   */
  protected onFocus(event: FocusEvent): void {
    this._programmaticChange = true;
    this._isFocused = true;
    this._programmaticChange = false;
    this.isFocusedChange.emit(true);
  }

  /**
   * Handle blur event on the input element
   */
  protected onBlur(event: FocusEvent): void {
    this.markAsTouched();
    this._programmaticChange = true;
    this._isFocused = false;
    this._programmaticChange = false;
    this.isFocusedChange.emit(false);
  }

  /**
   * Programmatically focus or blur the input when isFocused changes
   */
  protected handleFocusChange(shouldFocus: boolean): void {
    const inputElement = document.getElementById(this.id) as HTMLInputElement | null;
    if (inputElement) {
      setTimeout(() => {
        if (shouldFocus) {
          inputElement.focus();
        } else {
          inputElement.blur();
        }
      }, 0);
    }
  }
  /**
   * Generate a unique ID for the input element if none is provided
   */
  protected generateId(): string {
    const prefix = this.getComponentPrefix();
    return `kit-${prefix}-${Math.random().toString(36).substring(2, 9)}`;
  }

  /**
   * Get component prefix for ID generation - should be overridden by subclasses
   */
  protected abstract getComponentPrefix(): string;

  /**
   * Get default value for the input - can be overridden by subclasses
   */
  protected getDefaultValue(): T {
    return '' as unknown as T;
  }

  /**
   * Process value changes from the input element
   */
  protected onValueChange(newValue: T): void {
    this.value = newValue;
    this.valueChange.emit(newValue);
    this.onChange(newValue);
  }

  /**
   * Mark the control as touched
   */
  protected markAsTouched(): void {
    if (!this.touched) {
      this.touched = true;
      this.onTouched();
    }
  }

  /**
   * ControlValueAccessor implementation
   */
  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value: T): void {
    this.value = value !== undefined && value !== null ? value : this.getDefaultValue();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}