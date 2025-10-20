import { Component, Input, Output, EventEmitter, effect } from '@angular/core';
import { KitScreenService } from '../../../services/screen/screen.service';

@Component({
  selector: 'kit-dialog',
  standalone: true,
  imports: [],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class KitDialogComponent {
  /**
   * Controls whether the dialog is open or closed
   */
  @Input() isOpen: boolean = false;

  /**
   * Output event to notify parent component when dialog's open state changes
   */
  @Output() isOpenChange = new EventEmitter<boolean>();

  /**
   * Controls whether the dialog should be displayed in fullscreen mode
   * If not provided, will use ScreenService to determine based on screen size
   */
  @Input() fullscreen?: boolean;

  /**
   * Controls whether clicking on the backdrop closes the dialog
   * Default is true if not provided
   */
  @Input() closeOnBackdropClick: boolean = true;

  /**
   * Controls the padding of the dialog content
   * Default is '16px' if not provided
   */
  @Input() padding: string = '16px';

  /**
   * Internal property to track whether the dialog should be displayed in fullscreen mode
   */
  isFullscreen: boolean = false;

  constructor(private screenService: KitScreenService) {

    effect(() => {
      if (this.fullscreen === undefined) {
        if (this.screenService.currentSize() === 'small') {
          this.isFullscreen = true;
        } else {
          this.isFullscreen = false;
        }
      } else {
        this.isFullscreen = this.fullscreen;
      }
    });
  }

  /**
   * Handles backdrop clicks
   * If closeOnBackdropClick is true, will close the dialog
   */
  onBackdropClick(): void {
    if (this.closeOnBackdropClick) {
      this.isOpenChange.emit(false);
    }
  }
}
