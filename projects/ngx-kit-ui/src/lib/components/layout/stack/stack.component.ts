import { Component, Input } from '@angular/core';
import { Alignment } from '../layout-options';

@Component({
  selector: 'kit-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.scss']
})
export class StackComponent {
  @Input() alignment: Alignment = 'top-start';
  @Input() fit: 'loose' | 'expand' = 'loose';
  @Input() clip: boolean = true;
}
