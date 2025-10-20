
import { Component } from '@angular/core';
import { KitLayoutModule, KitTextModule, KitInteractorsModule, SimpleTableComponent } from '../../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../../shared/code-block/code-block.component';

@Component({
  selector: 'app-gesture-detector',
  standalone: true,
  imports: [KitLayoutModule, KitTextModule, KitInteractorsModule, CodeBlockComponent, SimpleTableComponent],
  templateUrl: './gesture-detector.component.html',
  styleUrls: ['./gesture-detector.component.scss']
})
export class GestureDetectorComponent {
  importModule = `import { KitInteractorModule } from ' @openkit-labs/ngx-kit-ui';`;
  importComponent = `import { GestureDetectorComponent } from ' @openkit-labs/ngx-kit-ui';`;
  usage = `<kit-gesture-detector (onTap)="onTap()"
                    (onDoubleTap)="onDoubleTap()"
                    (onSwipeLeft)="onSwipeLeft()"
                    (onSwipeRight)="onSwipeRight()"
                    (onSwipeUp)="onSwipeUp()"
                    (onSwipeDown)="onSwipeDown()"
                    (onLongPress)="onLongPress()"
                    (onPinch)="onPinch($event)">
  <!-- Your content here -->
</kit-gesture-detector>`;

  outputsDefinition = [
    { title: 'Output', lookupField: 'output' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Description', lookupField: 'description' }
  ];
  outputsDataset = [
    { output: 'onTap', type: 'EventEmitter<void>', description: 'Emitted on a single tap.' },
    { output: 'onDoubleTap', type: 'EventEmitter<void>', description: 'Emitted on a double tap.' },
    { output: 'onSwipeLeft', type: 'EventEmitter<void>', description: 'Emitted on a swipe to the left.' },
    { output: 'onSwipeRight', type: 'EventEmitter<void>', description: 'Emitted on a swipe to the right.' },
    { output: 'onSwipeUp', type: 'EventEmitter<void>', description: 'Emitted on a swipe up.' },
    { output: 'onSwipeDown', type: 'EventEmitter<void>', description: 'Emitted on a swipe down.' },
    { output: 'onLongPress', type: 'EventEmitter<void>', description: 'Emitted on a long press.' },
    { output: 'onPinch', type: 'EventEmitter<number>', description: 'Emitted on a pinch gesture, with the scale factor.' },
  ];

  lastAction = '';

  onTap() {
    this.lastAction = 'Tapped';
  }

  onDoubleTap() {
    this.lastAction = 'Double Tapped';
  }

  onSwipeLeft() {
    this.lastAction = 'Swiped Left';
  }

  onSwipeRight() {
    this.lastAction = 'Swiped Right';
  }

  onSwipeUp() {
    this.lastAction = 'Swiped Up';
  }

  onSwipeDown() {
    this.lastAction = 'Swiped Down';
  }

  onLongPress() {
    this.lastAction = 'Long Pressed';
  }

  onPinch(scale: number) {
    this.lastAction = `Pinched with scale: ${scale.toFixed(2)}`;
  }
}
