import { Directive, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[kitCopyToClipboard]'
})
export class KitCopyToClipboardDirective {

  @Input('kitCopyToClipboard')
  public payload: string = '';

  @Output('copied')
  public copied: EventEmitter<string> = new EventEmitter<string>();

  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent): void {
    event.preventDefault();

    if (!this.payload) {
      return;
    }

    // Create a temporary textarea
    const textarea = document.createElement('textarea');
    textarea.value = this.payload;
    textarea.style.position = 'fixed'; // Prevent scrolling
    textarea.style.top = '0';
    textarea.style.left = '0';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);

    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length); // For mobile

    try {
      const successful = document.execCommand('copy');
      if (successful) {
        this.copied.emit(this.payload);
      } else {
        console.warn('Copy command was unsuccessful');
      }
    } catch (err) {
      console.error('Failed to copy: ', err);
    }

    // Remove the temporary textarea
    document.body.removeChild(textarea);
  }
}
