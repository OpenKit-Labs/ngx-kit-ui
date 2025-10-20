import { Component, Host, HostBinding, Input } from '@angular/core';

/**
 * A component that centers its child content both horizontally and vertically.
 * Similar to Flutter's Center widget, it provides an easy way to position 
 * elements centrally without having to write custom CSS every time.
 */
@Component({
  selector: 'kit-center',
  standalone: true,
  imports: [],
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.scss']
})
export class KitCenterComponent {
  /**
   * Controls whether the component should take up the full width of its parent.
   * Default is true.
   */
  @Input() widthFill: boolean = true;

  /**
   * Controls whether the component should take up the full height of its parent.
   * Default is true.
   */
  @Input() heightFill: boolean = true;

  @HostBinding('style.display')
  readonly display = 'flex';

  @HostBinding('style.justify-content')
  get justifyContent(): string {
    return this.widthFill ? 'center' : 'flex-start';
  }

  @HostBinding('style.align-items')
  get alignItems(): string {
    return this.heightFill ? 'center' : 'flex-start';
  }

}