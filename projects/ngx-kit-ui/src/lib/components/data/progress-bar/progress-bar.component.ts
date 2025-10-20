import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'kit-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
  standalone: true,
})
export class KitProgressBarComponent {
  @Input()
  set value(value: number) {
    this.progress = Math.max(0, Math.min(100, value));
  }

  @HostBinding('style.--progress')
  progress = 0;
}
