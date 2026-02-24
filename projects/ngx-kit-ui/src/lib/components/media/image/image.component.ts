import { Component, Input, effect, input, signal } from '@angular/core';

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

  errorSrc = signal<string | null>(null);

  /** Internal signals */
  isLoading = signal(true);
  errored = signal(false);
  showImage = signal(false);

  /** Store natural width/height of the image to prevent collapse */
  imageWidth = signal<number | null>(null);
  imageHeight = signal<number | null>(null);

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
      this.imageWidth.set(null);
      this.imageHeight.set(null);

      // Preload main image
      const img = new Image();
      img.src = url;
      img.onload = () => {
        this.imageWidth.set(img.naturalWidth);
        this.imageHeight.set(img.naturalHeight);

        setTimeout(() => {
          this.showImage.set(true);
          this.isLoading.set(false);
          this.errored.set(false);
        }, 100);
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

    // Use default size fallback
    this.imageWidth.set(200);
    this.imageHeight.set(200);

    const placeholder = this.errorSrc();
    if (placeholder) {
      // Preload the placeholder image
      const img = new Image();
      img.src = placeholder;
      img.onload = () => {
        this.imageWidth.set(img.naturalWidth);
        this.imageHeight.set(img.naturalHeight);
        this.showImage.set(true);
        this.errored.set(false);
      };
      img.onerror = () => {
        // console.error('[ImageComponent] error placeholder failed to load, using default');
      };
    }
  }
}