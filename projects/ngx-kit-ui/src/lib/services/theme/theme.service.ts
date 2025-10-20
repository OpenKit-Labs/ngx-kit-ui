import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class KitThemeService {
  private readonly THEME_KEY = 'kit-theme';
  // Signal that holds the current theme class (e.g. 'kit-theme-light')
  private _currentTheme: WritableSignal<string> = signal('kit-theme-light');
  readonly currentTheme = this._currentTheme.asReadonly();

  constructor() {
    this.initializeTheme();
  }

  /**
   * Initialize theme from localStorage if available
   */
  private initializeTheme(): void {
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    if (savedTheme) {
      this.setTheme(savedTheme);
    }
  }

  /**
   * Set theme explicitly
   * @param themeClass Theme class to apply to <html> (e.g. 'kit-theme-light', 'kit-theme-dark', etc.)
   */
  setTheme(themeClass: string): void {
    const html = document.documentElement;
    // Remove all theme classes (those starting with 'kit-theme-')
    Array.from(html.classList)
      .filter(cls => cls.startsWith('kit-theme-'))
      .forEach(cls => html.classList.remove(cls));
    // Add the new theme class
    html.classList.add(themeClass);
    localStorage.setItem(this.THEME_KEY, themeClass);
    // Update signal
    this._currentTheme.set(themeClass);
  }

  /**
   * Get current theme class applied to <html>
   */
  getTheme(): string {
    const html = document.documentElement;
    const themeClass = Array.from(html.classList).find(cls => cls.startsWith('kit-theme-'));
    return themeClass || this._currentTheme();
  }
}