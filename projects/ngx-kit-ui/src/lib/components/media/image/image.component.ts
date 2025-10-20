import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { KitImageLoadingDirective } from './image-loading.directive';
import { KitImageErrorDirective } from './image-error.directive';

@Component({
  selector: 'kit-image',
  imports: [NgOptimizedImage, NgTemplateOutlet],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss'
})
export class KitImageComponent {

  // Allow missing/empty src. If src is empty we won't render the <img>
  // which avoids passing undefined/empty values to NgOptimizedImage.
  private _src: string = '';

  @Input()
  set src(value: string | undefined) {
    this._src = value ?? '';
    this.updateStateForSrc();
  }

  get src(): string {
    return this._src;
  }
  @Input() alt: string = '';
  @Input() width: string | number = 'auto';
  @Input() height: string | number = 'auto';
  @Input() borderRadius: string | number = 0;
  @Input() fit: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down' = 'cover';
  @Input() priority: boolean = false; // loads eagerly if true

  @Output() loaded = new EventEmitter<void>();
  @Output() error = new EventEmitter<void>();

  @ContentChild(KitImageLoadingDirective, { read: TemplateRef }) activeTemplate!: TemplateRef<any>;
  @ContentChild(KitImageErrorDirective, { read: TemplateRef }) inactiveTemplate!: TemplateRef<any>;

  isLoading = true;
  hasError = false;

  onLoad() {
    this.isLoading = false;
    this.hasError = false;
    this.loaded.emit();
  }

  onError() {
    this.isLoading = false;
    this.hasError = true;
    this.error.emit();
  }

  private updateStateForSrc() {
    // If there is no src we shouldn't show loading or error states.
    if (!this._src) {
      this.isLoading = false;
      this.hasError = false;
    } else {
      // New source -> show loading until load or error events fire
      this.isLoading = true;
      this.hasError = false;
    }
  }

  get hasCustomLoading() {
    return this.activeTemplate !== undefined;
  }

  get hasCustomError() {
    return this.inactiveTemplate !== undefined;
  }

  get containerWidth() {
    if (typeof this.width === 'number') {
      return `${this.width}px`;
    }
    if (typeof this.width === 'string' && !isNaN(Number(this.width))) {
      return `${this.width}px`;
    }
    return this.width;
  }

  get containerHeight() {
    if (typeof this.height === 'number') {
      return `${this.height}px`;
    }
    if (typeof this.height === 'string' && !isNaN(Number(this.height))) {
      return `${this.height}px`;
    }
    return this.height;
  }

  get containerBorderRadius() {
    if (typeof this.borderRadius === 'number') {
      return `${this.borderRadius}px`;
    }
    if (typeof this.borderRadius === 'string' && !isNaN(Number(this.borderRadius))) {
      return `${this.borderRadius}px`;
    }
    return this.borderRadius;
  }
}
