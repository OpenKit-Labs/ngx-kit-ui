import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { KitSelectItemDirective } from '../base/kit-select-item.directive';
import { KitSelectItemActiveDirective } from '../base/kit-select-item-active.directive';
import { KitInputFieldTitleComponent } from '../input-field-title/input-field-title.component';
import { KitTextCaptionComponent } from '../../text/text-caption/text-caption.component';
import { KitInputSelectComponent } from '../input-select/input-select.component';
import { KitBaseInputComponent } from '../base/base-input.component';

export interface CountryCode {
    id: string;
    name: string;
    code: string;
    flag: string;
}

export interface PhoneValue {
    countryCode: CountryCode | null;
    number: string;
}

@Component({
    selector: 'kit-input-phone',
    templateUrl: './input-phone.component.html',
    styleUrls: ['./input-phone.component.scss'],
    standalone: true,
    imports: [
        KitInputFieldTitleComponent,
        KitTextCaptionComponent,
        KitInputSelectComponent,
        KitSelectItemDirective,
        KitSelectItemActiveDirective
    ]
})
export class KitInputPhoneComponent extends KitBaseInputComponent<PhoneValue> implements OnInit {
    /**
     * Whether the field is required
     */
    @Input() required: boolean = false;

    /**
     * Custom country codes list. If not provided, uses default list
     */
    @Input() countryCodes: CountryCode[] = [];

    /**
     * Custom title text for the country selection dialog/bottom sheet
     */
    @Input() dialogTitle: string = 'Select country';

    @Output() paste = new EventEmitter<string>();

    /**
     * Default country codes
     */
    private defaultCountryCodes: CountryCode[] = [
        { id: 'us', name: 'United States', code: '+1', flag: '🇺🇸' },
        { id: 'uk', name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
        { id: 'ca', name: 'Canada', code: '+1', flag: '🇨🇦' },
        { id: 'au', name: 'Australia', code: '+61', flag: '🇦🇺' },
        { id: 'de', name: 'Germany', code: '+49', flag: '🇩🇪' },
        { id: 'fr', name: 'France', code: '+33', flag: '🇫🇷' },
        { id: 'es', name: 'Spain', code: '+34', flag: '🇪🇸' },
        { id: 'it', name: 'Italy', code: '+39', flag: '🇮🇹' },
        { id: 'nl', name: 'Netherlands', code: '+31', flag: '🇳🇱' },
        { id: 'jp', name: 'Japan', code: '+81', flag: '🇯🇵' },
        { id: 'kr', name: 'South Korea', code: '+82', flag: '🇰🇷' },
        { id: 'cn', name: 'China', code: '+86', flag: '🇨🇳' },
        { id: 'in', name: 'India', code: '+91', flag: '🇮🇳' },
        { id: 'br', name: 'Brazil', code: '+55', flag: '🇧🇷' },
        { id: 'mx', name: 'Mexico', code: '+52', flag: '🇲🇽' }
    ];

    /**
     * Get available country codes
     */
    get availableCountryCodes(): CountryCode[] {
        return this.countryCodes.length > 0 ? this.countryCodes : this.defaultCountryCodes;
    }

    override ngOnInit(): void {
        super.ngOnInit();

        // Set default country code if none is set
        if (!this.value.countryCode && this.availableCountryCodes.length > 0) {
            this.value = {
                ...this.value,
                countryCode: this.availableCountryCodes[0]
            };
        }
    }

    /**
     * Return the component prefix for ID generation
     */
    protected override getComponentPrefix(): string {
        return 'input-phone';
    }

    /**
     * Get default value for phone input
     */
    protected override getDefaultValue(): PhoneValue {
        return {
            countryCode: null,
            number: ''
        };
    }

    /**
     * Handle country code selection change
     */
    onCountryCodeChange(countryCode: CountryCode | undefined | null): void {
        if (countryCode) {
            const newValue: PhoneValue = {
                ...this.value,
                countryCode: countryCode
            };
            this.onValueChange(newValue);
        }
    }

    /**
     * Handle phone number input change
     */
    onNumberChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        let newNumber = input.value;

        // Remove any non-numeric characters except spaces, dashes, and parentheses for formatting
        newNumber = newNumber.replace(/[^\d\s\-\(\)]/g, '');

        // Update the input's displayed value to show the sanitized version immediately
        input.value = newNumber;

        const newValue: PhoneValue = {
            ...this.value,
            number: newNumber
        };
        this.onValueChange(newValue);
    }

    /**
     * Validate if the phone number is valid
     */
    isValidPhone(): boolean {
        if (!this.value) return !this.required;

        if (this.required && (!this.value.countryCode || !this.value.number.trim())) {
            return false;
        }

        // Check if the number contains only digits and the allowed formatting characters
        const validChars = /^[\d\s\-\(\)]*$/;
        if (!validChars.test(this.value.number)) {
            return false;
        }

        // Basic validation: at least 7 digits for phone numbers
        const digitsOnly = this.value.number.replace(/\D/g, '');
        return digitsOnly.length >= 7;
    }

    /**
     * Get formatted phone display value
     */
    getFormattedPhone(): string {
        if (!this.value.countryCode || !this.value.number) {
            return '';
        }
        return `${this.value.countryCode.code} ${this.value.number}`;
    }

    handlePasteEvent(event: ClipboardEvent): void {
        this.paste.emit(event.clipboardData?.getData('text') || '');
    }
}
