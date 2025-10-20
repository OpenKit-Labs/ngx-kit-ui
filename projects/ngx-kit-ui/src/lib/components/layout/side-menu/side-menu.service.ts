import { Injectable, signal, WritableSignal, Signal } from '@angular/core';

type SideMenuMode = 'overlay' | 'side';

@Injectable({
  providedIn: 'root'
})
export class KitSideMenuService {
  // Internal writable signals
  private _isOpen: WritableSignal<boolean> = signal<boolean>(false);
  private _mode: WritableSignal<SideMenuMode> = signal<SideMenuMode>('side');
  private _width: WritableSignal<string> = signal<string>('280px');

  // Exposed readonly signals for consumers to read current state.
  public readonly isOpen = this._isOpen.asReadonly();
  public readonly mode = this._mode.asReadonly();
  public readonly width = this._width.asReadonly();

  constructor() { }

  /**
   * Toggle the menu open/close state
   */
  toggle(): void {
    this._isOpen.update(v => !v);
  }

  /**
   * Force open the menu
   */
  open(): void {
    this._isOpen.set(true);
  }

  /**
   * Force close the menu
   */
  close(): void {
    this._isOpen.set(false);
  }

  /**
   * Set the menu display mode
   */
  setMode(mode: SideMenuMode): void {
    this._mode.set(mode);
  }

  /**
   * Set the menu width
   */
  setWidth(width: string): void {
    this._width.set(width);
  }

}