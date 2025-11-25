import { Component, Input } from '@angular/core';

@Component({
  selector: 'kit-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  standalone: true,
  host: {
    '[class.full-width]': 'itemSizing === "full"',
    '[class.content-width]': 'itemSizing === "content"',
    '[class.fixed-width]': 'itemSizing === "fixed"'
  }
})
export class KitCarouselComponent {
  @Input() itemSizing: 'full' | 'content' | 'fixed' = 'full';
}
