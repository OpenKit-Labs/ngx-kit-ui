import { Component, Input, TemplateRef, effect, input, signal } from '@angular/core';

@Component({
  selector: 'kit-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class KitImageComponent {
  /** Input image src as a signal */
  src = input<string | null>(null);

  objectFit = input<'cover' | 'contain' | 'fill' | 'none' | 'scale-down'>('cover');

  width = input<string>('100%');
  height = input<string>('auto');
  aspectRatio = input<string | null>(null);
  borderRadius = input<string | null>(null);

  /** Error image src - optional fallback image */
  errorSrc = input<string | null>(null);

  /** Optional custom loading template */
  loadingTemplate = input<TemplateRef<void> | null>(null);

  /** Optional custom error template */
  errorTemplate = input<TemplateRef<void> | null>(null);

  /** Internal signals */
  isLoading = signal(true);
  errored = signal(false);
  showImage = signal(false);

  constructor() {
    effect(() => {
      const url = this.src();
      if (!url) {
        this.handleError();
        return;
      }

      this.isLoading.set(true);
      this.errored.set(false);
      this.showImage.set(false);

      // Preload image - just check it exists, don't use natural dimensions
      const img = new Image();
      img.src = url;
      img.onload = () => {
        // Use smooth fade-in instead of setTimeout delay
        this.showImage.set(true);
        this.isLoading.set(false);
        this.errored.set(false);
      };
      img.onerror = () => {
        this.handleError();
      };
    });
  }

  /** Handle error state and optional placeholder */
  private handleError() {
    this.isLoading.set(false);
    this.errored.set(true);
    this.showImage.set(false);

    const placeholder = this.errorSrc();
    if (placeholder) {
      // Preload the error placeholder image
      const img = new Image();
      img.src = placeholder;
      img.onload = () => {
        this.showImage.set(true);
        this.errored.set(false);
      };
      img.onerror = () => {
        // Error image also failed - show error state
        this.showImage.set(false);
      };
    }
  }
}