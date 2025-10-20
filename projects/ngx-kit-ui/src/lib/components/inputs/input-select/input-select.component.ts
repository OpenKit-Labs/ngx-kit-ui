import { Component, Input, OnDestroy, OnInit, OnChanges, SimpleChanges, ContentChild, TemplateRef, Optional, Self, effect } from '@angular/core';
import { NgControl } from '@angular/forms';
import { KitScreenService } from '../../../services/screen/screen.service';
import { Subscription } from 'rxjs';
import { KitSelectItemActiveDirective } from './kit-select-item-active.directive';
import { KitSelectItemDirective } from './kit-select-item.directive';
import { KitInputFieldTitleComponent } from '../input-field-title/input-field-title.component';
import { KitTextCaptionComponent } from '../../text/text-caption/text-caption.component';
import { KitOverlaysModule } from '../../overlays/overlays.module';
import { KitTextLabelComponent } from '../../text/text-label/text-label.component';
import { KitBaseInputComponent } from '../base/base-input.component';
import { KitInputTextComponent } from '../input-text/input-text.component';
import { KitSelectEmptyDirective } from './kit-select-empty.directive';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'kit-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
  standalone: true,
  imports: [NgTemplateOutlet, KitInputFieldTitleComponent, KitTextCaptionComponent, KitOverlaysModule, KitTextLabelComponent, KitInputTextComponent]
})
export class KitInputSelectComponent<T = any> extends KitBaseInputComponent<T> implements OnInit, OnDestroy, OnChanges {
  /**
   * Whether the field is required
   */
  @Input() required: boolean = false;

  /**
   * Options dataset for the select component
   * Can be an array of objects or simple values
   */
  @Input() options: T[] = [];

  /**
   * The field name to use for matching items (default: 'id' or '_id')
   */
  @Input() matchField: string = 'id';

  /**
   * The field name to use as display text for each option (default: 'name')
   */
  @Input() displayField: string = 'name';

  /**
   * Custom title text for the dialog/bottom sheet (default: 'Select an option')
   */
  @Input() dialogTitle: string = 'Select an option';

  /**
   * Whether to show a search box at the top of the options list
   */
  @Input() showSearchBox: boolean = false;
  @Input() searchField: string | null = null;
  @Input() searchBoxPlaceholder: string = 'Search options...';

  /**
   * Template references for custom rendering of options
   */
  @ContentChild(KitSelectItemActiveDirective, { read: TemplateRef }) activeTemplate!: TemplateRef<any>;
  @ContentChild(KitSelectItemDirective, { read: TemplateRef }) inactiveTemplate!: TemplateRef<any>;
  @ContentChild(KitSelectEmptyDirective, { read: TemplateRef }) emptyTemplate!: TemplateRef<any>;

  /**
   * Control states for dialogs and bottom sheets
   */
  isBottomSheetOpen: boolean = false;
  isDialogOpen: boolean = false;

  /**
   * Track if the UI is on a small screen
   */
  isSmallScreen: boolean = false;

  /**
   * Search functionality
   */
  searchTerm: string = '';
  filteredOptions: T[] = [];

  /**
   * Keep track of our subscriptions
   */
  private screenSubscription: Subscription | null = null;

  constructor(private screenService: KitScreenService, @Optional() @Self() ngControl: NgControl | null = null) {
    super(ngControl);
    // Subscribe to screen size changes
    effect(() => {
      const isSmall = this.screenService.isSmall();
      this.isSmallScreen = isSmall;
    });
  }

  override ngOnInit() {
    super.ngOnInit();

    // Initialize filtered options
    this.filteredOptions = [...this.options];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['options'] && this.options) {
      this.filteredOptions = [...this.options];
      // Reapply search filter if there's an active search
      if (this.searchTerm) {
        this.filterOptions();
      }
    }
  }

  ngOnDestroy() {
    // Clean up subscription
    if (this.screenSubscription) {
      this.screenSubscription.unsubscribe();
      this.screenSubscription = null;
    }
  }

  /**
   * Return the component prefix for ID generation
   */
  protected getComponentPrefix(): string {
    return 'input-select';
  }

  /**
   * Opens the appropriate selection UI based on screen size
   */
  openSelect(): void {
    // Reset search when opening
    this.searchTerm = '';
    this.filteredOptions = [...this.options];

    if (this.isSmallScreen) {
      this.isBottomSheetOpen = true;
      this.isDialogOpen = false;
    } else {
      this.isDialogOpen = true;
      this.isBottomSheetOpen = false;
    }
  }

  /**
   * Handle keyboard events for accessibility
   */
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.openSelect();
    }
  }

  /**
   * Closes all selection UIs
   */
  closeSelect(): void {
    setTimeout(() => {
      this.isBottomSheetOpen = false;
      this.isDialogOpen = false;
      // Reset search when closing
      this.searchTerm = '';
      this.filteredOptions = [...this.options];
    }, 250);
  }

  /**
   * Handle search input changes
   */
  onSearchChange(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filterOptions();
  }

  /**
   * Filter options based on search term
   */
  private filterOptions(): void {
    if (!this.searchTerm.trim()) {
      this.filteredOptions = [...this.options];
      return;
    }

    const searchLower = this.searchTerm.toLowerCase().trim();
    this.filteredOptions = this.options.filter(option => {
      const searchValue = this.getSearchValue(option).toLowerCase();
      return searchValue.includes(searchLower);
    });
  }

  /**
   * Get the search value for the option
   * Uses searchField if defined, otherwise falls back to displayField
   */
  getSearchValue(option: T): string {
    if (this.isPrimitive(option)) {
      return String(option);
    }

    const objWithKey = option as Record<string, any>;
    const fieldToSearch = this.searchField || this.displayField;
    return String(objWithKey[fieldToSearch] || 'Unknown Option');
  }

  /**
   * Handle option selection
   * This will be used inside the dialog/bottom sheet
   */
  onOptionSelect(option: T): void {
    // Update the value using the base class method for proper form integration
    this.onValueChange(option);

    // Close the selection UI
    this.closeSelect();
  }

  /**
   * Get the display value for the option
   */
  getDisplayValue(option: T): string {
    if (this.isPrimitive(option)) {
      return String(option);
    }

    const objWithKey = option as Record<string, any>;
    return String(objWithKey[this.displayField] || 'Unknown Option');
  }

  /**
   * Get the ID/value for the option
   */
  getOptionValue(option: T): string {
    if (this.isPrimitive(option)) {
      return String(option);
    }

    const objWithKey = option as Record<string, any>;
    // Try matchField, or fallback to _id if matchField is not found
    const idField = objWithKey[this.matchField] !== undefined ? this.matchField : '_id';
    return String(objWithKey[idField] || '');
  }

  /**
   * Check if the current value matches the option
   */
  isSelected(option: T): boolean {
    if (!this.value) return false;

    if (this.isPrimitive(option)) {
      return String(option) === String(this.value);
    }

    const valueObj = this.value as Record<string, any>;
    const optionObj = option as Record<string, any>;

    // Try matchField, or fallback to _id if matchField is not found
    const idField = optionObj[this.matchField] !== undefined ? this.matchField : '_id';

    return valueObj && optionObj &&
      valueObj[idField] !== undefined &&
      optionObj[idField] !== undefined &&
      String(valueObj[idField]) === String(optionObj[idField]);
  }

  /**
   * Check if a value is a primitive type
   */
  private isPrimitive(value: any): boolean {
    return (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean'
    );
  }

  protected override getDefaultValue(): T {
    return null as unknown as T;
  }

  hasCustomActiveTemplate(): boolean {
    return !!this.activeTemplate;
  }

  hasCustomInactiveTemplate(): boolean {
    return !!this.inactiveTemplate;
  }

  hasCustomEmptyTemplate(): boolean {
    return !!this.emptyTemplate;
  }

  /**
   * Get the context for template rendering
   */
  getOptionContext(option: T): { option: T, isSelected: boolean } {
    return {
      option,
      isSelected: this.isSelected(option)
    };
  }
}
