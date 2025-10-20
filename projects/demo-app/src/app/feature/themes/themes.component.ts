import { Component } from '@angular/core';
import { KitButtonModule, KitLayoutModule, KitPanelModule, KitTextModule, KitThemeService } from '../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../shared/code-block/code-block.component';
import { NgIconComponent } from "@ng-icons/core";

@Component({
  selector: 'app-themes',
  imports: [KitLayoutModule, KitButtonModule, KitTextModule, KitPanelModule, CodeBlockComponent, NgIconComponent],
  templateUrl: './themes.component.html',
  styleUrl: './themes.component.scss'
})
export class ThemesComponent {

  constructor(private kitThemeService: KitThemeService) { }

  onCopyTheme(theme: { name: string; description: string, className: string, code: string }) {
    navigator.clipboard.writeText(theme.code);
  }

  onApplyTheme(theme: { name: string; description: string, className: string, code: string }) {
    const style = document.createElement('style');
    style.id = `kit-theme-${theme.name}`;

    style.textContent = theme.code;

    this.kitThemeService.setTheme(theme.className);
  }

  // Example 1: CSS you would add to your global styles (overrides kit variables)
  simpleExampleCode1 = `
/* In styles.scss or styles.css (global) */
.my-app-accent {
  /* Override primary color used across kit components */
  --kit-color-primary: #ff6b6b;
  --kit-color-primary-rgb: 255, 107, 107;
  --kit-color-primary-dark: #e05555;
}
  `;

  // Example 2: Using the KitThemeService to apply the class to the app root
  simpleExampleCode2 = `
// In an Angular component (e.g. AppComponent or a settings panel)
import { Component } from '@angular/core';
import { KitThemeService } from ' @openkit-labs/ngx-kit-ui';

@Component({
  selector: 'app-component',
  template: './app.component.html',
})
export class AppComponent {
  constructor(private kitThemeService: KitThemeService) {}

  setAccent() {
    // Apply the CSS class you created in the global stylesheet
    this.kitThemeService.setTheme('my-app-accent');
  }
}
  `;


  themes: Array<{ name: string; description: string, className: string, code: string }> = [
    //------------------------------LIGHT MODE-----------------------------------
    {
      name: 'Light Mode',
      description: 'A light theme with a bright background and dark text.',
      className: 'kit-theme-light',
      code: `
.kit-theme-light {
  /* Colors */
  /*----------------------------------------------------------------------------------------*/
  --kit-color-primary: #0066cc;
  --kit-color-primary-rgb: 0, 102, 204;
  --kit-color-primary-dark: #0052a3;

  --kit-color-secondary: #6c757d;
  --kit-color-secondary-rgb: 108, 117, 125;
  --kit-color-secondary-dark: #5a6268;

  --kit-color-success: #28a745;
  --kit-color-success-rgb: 40, 167, 69;
  --kit-color-success-dark: #218838;

  --kit-color-info: #17a2b8;
  --kit-color-info-rgb: 23, 162, 184;
  --kit-color-info-dark: #138496;

  --kit-color-warning: #ffc107;
  --kit-color-warning-rgb: 255, 193, 7;
  --kit-color-warning-dark: #e0a800;

  --kit-color-danger: #dc3545;
  --kit-color-danger-dark: #c82333;

  --kit-color-transparent-text: var(--kit-text-color-primary);
  --kit-color-transparent-text-rgb: 33, 37, 41;

  /* Text Colors */
  --kit-text-color-primary: #212529;
  --kit-text-color-secondary: #6c757d;
  --kit-text-color-muted: #adb5bd;

  /* Background Colors */
  --kit-background-color: #ffffff;

  /*----------------------------------------------------------------------------------------*/
  /* Text Component Variables */
  /*----------------------------------------------------------------------------------------*/
  /* Font Sizes */
  --kit-font-size-heading: 2rem;
  --kit-font-size-subheading: 1.5rem;
  --kit-font-size-display: 3.0rem;
  --kit-font-size-label: 1.25rem;
  --kit-font-size-body: 1rem;
  --kit-font-size-link: 1rem;
  --kit-font-size-caption: 0.875rem;

  /* Font Weights */
  --kit-font-weight-heading: 700;
  --kit-font-weight-subheading: 500;
  --kit-font-weight-display: 900;
  --kit-font-weight-label: 500;
  --kit-font-weight-body: 400;
  --kit-font-weight-link: 400;
  --kit-font-weight-caption: 400;

  /* Line Heights */
  --kit-line-height-heading: 1.2;
  --kit-line-height-subheading: 1.2;
  --kit-line-height-display: 1.3;
  --kit-line-height-label: 1.4;
  --kit-line-height-body: 1.5;
  --kit-line-height-link: 1.5;
  --kit-line-height-caption: 1.4;

  /*----------------------------------------------------------------------------------------*/
  /* Button Variables */
  /*----------------------------------------------------------------------------------------*/
  /* Regular Buttons */
  --kit-button-border-radius: 12px;
  --kit-button-disabled-opacity: 0.6;
  --kit-button-font-size: 14px;
  --kit-button-font-weight: 700;
  --kit-button-height: 40px;
  --kit-button-margin: 0;
  --kit-button-padding: 24px 24px;

  /* Text Buttons */
  --kit-text-button-font-size: 14px;
  --kit-text-button-height: 40px;
  --kit-text-button-margin: 0;
  --kit-text-button-padding: 24px 24px;

  /* Round Buttons */
  --kit-round-button-font-size: 16px;
  --kit-round-button-margin: 0;
  --kit-round-button-size: 40px;

  /* Floating Action Buttons */
  --kit-floating-action-button-font-size: 18px;
  --kit-floating-action-button-margin: 16px;
  --kit-floating-action-button-shadow: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  --kit-floating-action-button-size: 56px;

  /*----------------------------------------------------------------------------------------*/
  /* Input Variables */
  /*----------------------------------------------------------------------------------------*/

  /* Input Field Variables */
  --kit-input-field-title-color: #212529;
  --kit-input-field-title-disabled-color: #adb5bd;
  --kit-input-field-title-font-size: 1rem;
  --kit-input-field-title-font-weight: 600;
  --kit-input-field-title-line-height: 1.6;
  --kit-input-field-title-margin-bottom: 0.2rem;
  --kit-input-field-title-required-indicator-color: #dc3545;

  --kit-input-padding: 12px 16px;
  --kit-input-font-size: var(--kit-font-size-body);
  --kit-input-line-height: 1.5;
  --kit-input-text-color: var(--kit-text-color-primary);
  --kit-input-background-color: #e8e8e8;
  --kit-input-border-width: 2px;
  --kit-input-border-color: transparent;
  --kit-input-border-radius: 16px;

  /* Input States */
  --kit-input-focus-border-color: var(--kit-color-primary);
  --kit-input-disabled-background-color: #f5f5f5;
  --kit-input-disabled-text-color: var(--kit-text-color-muted);
  --kit-input-placeholder-color: var(--kit-text-color-secondary);
  --kit-input-disabled-placeholder-color: var(--kit-text-color-muted);

  /* Input Error States */
  --kit-input-error-border-color: var(--kit-color-danger);
  --kit-input-error-background-color: #fce8ea;

  /* Select Item Variables */
  --kit-select-item-padding: 12px 16px;
  --kit-select-item-font-size: var(--kit-font-size-body);
  --kit-select-item-line-height: var(--kit-line-height-body);
  --kit-select-item-text-color: var(--kit-text-color-primary);
  --kit-select-item-background-color: transparent;
  --kit-select-item-border-radius: 14px;
  --kit-select-item-transition: all 0.2s ease;
  --kit-select-item-cursor: pointer;

  /* Select Item Selected State */
  --kit-select-item-selected-background-color: var(--kit-color-primary);
  --kit-select-item-selected-text-color: #ffffff;
  --kit-select-item-selected-border-radius: 14px;

  /* Select Item Hover State */
  --kit-select-item-hover-background-color: rgba(0, 102, 204, 0.1);

  /* Select Item Check Mark */
  --kit-select-item-check-color: #ffffff;
  --kit-select-item-check-size: 16px;

  /* Input Phone Country Code Variables */
  --kit-input-phone-country-code-background-color: #f5f5f5;
  --kit-input-phone-country-code-border-color: #e0e0e0;
  --kit-input-phone-country-code-border-width: 1px;
  --kit-input-phone-country-code-border-radius: 6px;
  --kit-input-phone-country-code-padding: 4px 8px;
  --kit-input-phone-country-code-font-size: 0.9em;
  --kit-input-phone-country-code-font-weight: 500;
  --kit-input-phone-country-code-text-color: var(--kit-text-color-secondary);

  /*----------------------------------------------------------------------------------------*/
  /* Card Variables */
  /*----------------------------------------------------------------------------------------*/
  --kit-card-background-color: #ffffff;
  --kit-card-border-radius: 16px;
  --kit-card-border-width: 1px;
  --kit-card-border-color: transparent;
  --kit-card-padding: 16px;

  /* Card Shadows */
  --kit-card-shadow-low: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  --kit-card-shadow-medium: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  --kit-card-shadow-high: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

  /* Card Interactive States */
  --kit-card-hover-transform: translateY(-2px);
  --kit-card-hover-shadow: 0 4px 8px rgba(0, 0, 0, 0.16), 0 4px 8px rgba(0, 0, 0, 0.23);
  --kit-card-active-transform: translateY(0);
  --kit-card-active-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24);
  --kit-card-focus-shadow: 0 0 0 3px rgba(var(--kit-color-primary-rgb, 0, 102, 204), 0.2);
  --kit-card-disabled-opacity: 0.6;

  /* Divider Variables */
  --kit-divider-default-color: #e0e0e0;
  --kit-divider-default-thickness: 1px;
  --kit-divider-horizontal-margin: 0 16px;
  --kit-divider-vertical-margin: 16px 0;

  /*----------------------------------------------------------------------------------------*/
  /* Navigation Component Variables */
  /*----------------------------------------------------------------------------------------*/
  /* Top Bar Variables */
  --kit-top-bar-background-color: #ffffff;
  --kit-top-bar-border-color: rgba(0, 0, 0, 0.12);
  --kit-top-bar-height: 56px;
  --kit-top-bar-padding: 0 16px;
  --kit-top-bar-shadow-color: rgba(0, 0, 0, 0.1);

  /* Bottom Bar Variables */
  --kit-bottom-bar-padding: 0 16px;
  --kit-bottom-bar-background-color: #ffffff;
  --kit-bottom-bar-shadow-color: rgba(0, 0, 0, 0.1);
  --kit-bottom-bar-border-color: rgba(0, 0, 0, 0.12);

  /* Page Variables */
  --kit-page-padding: 16px;

  /* Side Menu Variables */
  --kit-side-menu-background-color: #ffffff;
  --kit-side-menu-border: 1px solid rgba(0, 0, 0, 0.1);
  --kit-side-menu-overlay-color: rgba(0, 0, 0, 0.3);
  --kit-side-menu-shadow: 2px 0 10px rgba(0, 0, 0, 0.2)
    /*----------------------------------------------------------------------------------------*/
    /* Table Component Variables */
    /*----------------------------------------------------------------------------------------*/
    --kit-table-background-color: #fff;
  --kit-table-border-radius: 8px;
  --kit-table-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  --kit-table-font-size: 1rem;
  --kit-table-font-size-mobile: 0.95rem;
  --kit-table-cell-padding: 0.75rem 1.25rem;
  --kit-table-cell-padding-mobile: 0.5rem 0.5rem;
  --kit-table-row-border-width: 1px;
  --kit-table-row-border-color: #eaeaea;
  --kit-table-header-background-color: #f7f7f9;
  --kit-table-header-font-weight: 600;
  --kit-table-header-text-color: #333;
  --kit-table-header-border-width: 2px;
  --kit-table-header-letter-spacing: 0.02em;
  --kit-table-header-row-border-radius: 8px 8px 0 0;
  --kit-table-row-hover-background-color: #f0f4fa;
  --kit-table-cell-text-color: #444;

  //----------------------------------------------------------------------------------------
  /* Progress Bar Component Variables */
  //----------------------------------------------------------------------------------------
  --kit-progress-bar-height: 8px;
  --kit-progress-bar-border-radius: 8px;
  --kit-progress-bar-background-color: #e5e7eb;
  --kit-progress-bar-progress-color: #3b82f6;

  //----------------------------------------------------------------------------------------
  /* Image Component Variables */
  //----------------------------------------------------------------------------------------
  --kit-image-border-radius: 8px;
  --kit-image-min-height: 50px;
  --kit-image-min-width: 50px;
  --kit-image-loading-background: #dedede;
  --kit-image-error-background: #dedede;

  /*----------------------------------------------------------------------------------------*/
  /* Z Layer */
  /*----------------------------------------------------------------------------------------*/
  --kit-z-base: 0;
  --kit-z-content: 100;
  --kit-z-overlay: 1000;
}
      `
    },
    //------------------------------DARK MODE------------------------------------
    {
      name: 'Dark Mode',
      description: 'A dark theme with a dark background and light text.',
      className: 'kit-theme-dark',
      code: `
.kit-theme-dark {
  //----------------------------------------------------------------------------------------
  /* Colors */
  //----------------------------------------------------------------------------------------
  --kit-color-primary: #3399ff;
  --kit-color-primary-rgb: 51, 153, 255;
  --kit-color-primary-dark: #1976d2;

  --kit-color-secondary: #b0b3b8;
  --kit-color-secondary-rgb: 176, 179, 184;
  --kit-color-secondary-dark: #8d9096;

  --kit-color-success: #43d675;
  --kit-color-success-rgb: 67, 214, 117;
  --kit-color-success-dark: #2e7d4f;

  --kit-color-info: #29b6f6;
  --kit-color-info-rgb: 41, 182, 246;
  --kit-color-info-dark: #0288d1;

  --kit-color-warning: #ffb300;
  --kit-color-warning-rgb: 255, 179, 0;
  --kit-color-warning-dark: #ffa000;

  --kit-color-danger: #ff5252;
  --kit-color-danger-dark: #c62828;

  --kit-color-transparent-text: var(--kit-text-color-primary);
  --kit-color-transparent-text-rgb: 195, 195, 195;

  /* Text Colors */
  --kit-text-color-primary: #f1f3f4;
  --kit-text-color-secondary: #b0b3b8;
  --kit-text-color-muted: #6c757d;

  /* Background Colors */
  --kit-background-color: #181a1b;

  //----------------------------------------------------------------------------------------
  /* Text Component Variables */
  //----------------------------------------------------------------------------------------
  --kit-font-size-heading: 2rem;
  --kit-font-size-subheading: 1.5rem;
  --kit-font-size-display: 3.0rem;
  --kit-font-size-label: 1.25rem;
  --kit-font-size-body: 1rem;
  --kit-font-size-link: 1rem;
  --kit-font-size-caption: 0.875rem;

  --kit-font-weight-heading: 700;
  --kit-font-weight-subheading: 500;
  --kit-font-weight-display: 900;
  --kit-font-weight-label: 500;
  --kit-font-weight-body: 400;
  --kit-font-weight-link: 400;
  --kit-font-weight-caption: 400;

  --kit-line-height-heading: 1.2;
  --kit-line-height-subheading: 1.2;
  --kit-line-height-display: 1.3;
  --kit-line-height-label: 1.4;
  --kit-line-height-body: 1.5;
  --kit-line-height-link: 1.5;
  --kit-line-height-caption: 1.4;

  //----------------------------------------------------------------------------------------
  /* Button Variables */
  //----------------------------------------------------------------------------------------
  --kit-button-border-radius: 12px;
  --kit-button-disabled-opacity: 0.5;
  --kit-button-font-size: 14px;
  --kit-button-font-weight: 700;
  --kit-button-height: 40px;
  --kit-button-margin: 0;
  --kit-button-padding: 24px 24px;

  --kit-text-button-font-size: 14px;
  --kit-text-button-height: 40px;
  --kit-text-button-margin: 0;
  --kit-text-button-padding: 24px 24px;

  --kit-round-button-font-size: 16px;
  --kit-round-button-margin: 0;
  --kit-round-button-size: 40px;

  --kit-floating-action-button-font-size: 18px;
  --kit-floating-action-button-margin: 16px;
  --kit-floating-action-button-shadow: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5));
  --kit-floating-action-button-size: 56px;

  //----------------------------------------------------------------------------------------
  /* Input Variables */
  //----------------------------------------------------------------------------------------
  --kit-input-field-title-color: #f1f3f4;
  --kit-input-field-title-disabled-color: #6c757d;
  --kit-input-field-title-font-size: 1rem;
  --kit-input-field-title-font-weight: 600;
  --kit-input-field-title-line-height: 1.6;
  --kit-input-field-title-margin-bottom: 0.2rem;
  --kit-input-field-title-required-indicator-color: #ff5252;

  --kit-input-padding: 12px 16px;
  --kit-input-font-size: var(--kit-font-size-body);
  --kit-input-line-height: 1.5;
  --kit-input-text-color: #f1f3f4;
  --kit-input-background-color: #23272b;
  --kit-input-border-width: 2px;
  --kit-input-border-color: #333;
  --kit-input-border-radius: 16px;

  --kit-input-focus-border-color: #3399ff;
  --kit-input-disabled-background-color: #23272b;
  --kit-input-disabled-text-color: #6c757d;
  --kit-input-placeholder-color: #b0b3b8;
  --kit-input-disabled-placeholder-color: #6c757d;

  --kit-input-error-border-color: #ff5252;
  --kit-input-error-background-color: #2d1a1a;

  --kit-select-item-padding: 12px 16px;
  --kit-select-item-font-size: var(--kit-font-size-body);
  --kit-select-item-line-height: var(--kit-line-height-body);
  --kit-select-item-text-color: #f1f3f4;
  --kit-select-item-background-color: transparent;
  --kit-select-item-border-radius: 14px;
  --kit-select-item-transition: all 0.2s ease;
  --kit-select-item-cursor: pointer;

  --kit-select-item-selected-background-color: #3399ff;
  --kit-select-item-selected-text-color: #181a1b;
  --kit-select-item-selected-border-radius: 14px;

  --kit-select-item-hover-background-color: rgba(51, 153, 255, 0.1);

  --kit-select-item-check-color: #181a1b;
  --kit-select-item-check-size: 16px;

  --kit-input-phone-country-code-background-color: #23272b;
  --kit-input-phone-country-code-border-color: #333;
  --kit-input-phone-country-code-border-width: 1px;
  --kit-input-phone-country-code-border-radius: 6px;
  --kit-input-phone-country-code-padding: 4px 8px;
  --kit-input-phone-country-code-font-size: 0.9em;
  --kit-input-phone-country-code-font-weight: 500;
  --kit-input-phone-country-code-text-color: #b0b3b8;

  //----------------------------------------------------------------------------------------
  /* Card Variables */
  //----------------------------------------------------------------------------------------
  --kit-card-background-color: #23272b;
  --kit-card-border-radius: 16px;
  --kit-card-border-width: 1px;
  --kit-card-border-color: #333;
  --kit-card-padding: 16px;

  --kit-card-shadow-low:
    0 1px 3px rgba(0, 0, 0, 0.32), 0 1px 2px rgba(0, 0, 0, 0.44);
  --kit-card-shadow-medium:
    0 3px 6px rgba(0, 0, 0, 0.36), 0 3px 6px rgba(0, 0, 0, 0.43);
  --kit-card-shadow-high:
    0 10px 20px rgba(0, 0, 0, 0.39), 0 6px 6px rgba(0, 0, 0, 0.43);

  --kit-card-hover-transform: translateY(-2px);
  --kit-card-hover-shadow:
    0 4px 8px rgba(0, 0, 0, 0.36), 0 4px 8px rgba(0, 0, 0, 0.43);
  --kit-card-active-transform: translateY(0);
  --kit-card-active-shadow:
    0 2px 4px rgba(0, 0, 0, 0.32), 0 2px 4px rgba(0, 0, 0, 0.44);
  --kit-card-focus-shadow: 0 0 0 3px rgba(var(--kit-color-primary-rgb, 51, 153, 255),
      0.2);
  --kit-card-disabled-opacity: 0.5;

  //----------------------------------------------------------------------------------------
  /* Navigation Component Variables */
  //----------------------------------------------------------------------------------------
  --kit-top-bar-bg-color: #181a1b;
  --kit-top-bar-border-color: rgba(255, 255, 255, 0.08);
  --kit-top-bar-height: 56px;
  --kit-top-bar-padding: 0 16px;
  --kit-top-bar-shadow-color: rgba(0, 0, 0, 0.5);

  --kit-bottom-bar-padding: 0 16px;
  --kit-bottom-bar-bg-color: #23272b;
  --kit-bottom-bar-shadow-color: rgba(0, 0, 0, 0.5);
  --kit-bottom-bar-border-color: rgba(255, 255, 255, 0.08);

  --kit-side-menu-bg-color: #181a1b;
  --kit-side-menu-border: 1px solid rgba(255, 255, 255, 0.08);
  --kit-side-menu-overlay-color: rgba(0, 0, 0, 0.7);
  --kit-side-menu-shadow: 2px 0 10px rgba(0, 0, 0, 0.5);

  //----------------------------------------------------------------------------------------
  /* Table Component Variables */
  //----------------------------------------------------------------------------------------
  --kit-table-background-color: #23272b;
  --kit-table-border-radius: 8px;
  --kit-table-shadow: 0 2px 8px rgba(0, 0, 0, 0.14);
  --kit-table-font-size: 1rem;
  --kit-table-font-size-mobile: 0.95rem;
  --kit-table-cell-padding: 0.75rem 1.25rem;
  --kit-table-cell-padding-mobile: 0.5rem 0.5rem;
  --kit-table-row-border-width: 1px;
  --kit-table-row-border-color: #333;
  --kit-table-header-background-color: #35393d;
  --kit-table-header-font-weight: 600;
  --kit-table-header-text-color: #b0b3b8;
  --kit-table-header-border-width: 2px;
  --kit-table-header-letter-spacing: 0.02em;
  --kit-table-header-row-border-radius: 8px 8px 0 0;
  --kit-table-row-hover-background-color: #2c3136;
  --kit-table-cell-text-color: #f1f3f4;

  //----------------------------------------------------------------------------------------
  /* Progress Bar Component Variables */
  //----------------------------------------------------------------------------------------
  --kit-progress-bar-height: 8px;
  --kit-progress-bar-border-radius: 8px;
  --kit-progress-bar-background-color: #505050;
  --kit-progress-bar-progress-color: #3b82f6;

  //----------------------------------------------------------------------------------------
  /* Image Component Variables */
  //----------------------------------------------------------------------------------------
  --kit-image-border-radius: 8px;
  --kit-image-min-height: 50px;
  --kit-image-min-width: 50px;
  --kit-image-loading-background: #dedede;
  --kit-image-error-background: #dedede;

  //----------------------------------------------------------------------------------------
  /* Z Layer */
  //----------------------------------------------------------------------------------------
  --kit-z-base: 0;
  --kit-z-content: 100;
  --kit-z-overlay: 1000;
  }
      `
    },

  ]
}
