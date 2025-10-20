import { NgStyle } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

/**
 * A component that creates a box with a specified width and height.
 * Similar to Flutter's SizedBox widget, it provides a simple way to 
 * create space or size constraints in layouts.
 */
@Component({
  selector: 'kit-sized-box',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './sized-box.component.html',
  styleUrls: ['./sized-box.component.scss']
})
export class KitSizedBoxComponent implements OnChanges {
  /**
   * The width of the box in pixels.
   */
  @Input() width?: number;

  /**
   * The height of the box in pixels.
   */
  @Input() height?: number;

  /**
   * Generated style object based on inputs
   */
  boxStyles: { [key: string]: string } = {};

  ngOnChanges(changes: SimpleChanges): void {
    this.updateStyles();
  }

  private updateStyles(): void {
    this.boxStyles = {};

    if (this.width !== undefined) {
      this.boxStyles['width'] = `${this.width}px`;
    }

    if (this.height !== undefined) {
      this.boxStyles['height'] = `${this.height}px`;
    }
  }
}