import { Component } from '@angular/core';
import { KitDirectivesModule, KitLayoutModule, KitTextModule, SimpleTableComponent, KitButtonModule } from '../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../shared/code-block/code-block.component';

@Component({
  selector: 'app-press-and-hold-directive-demo',
  templateUrl: './press-and-hold-directive-demo.component.html',
  styleUrls: ['./press-and-hold-directive-demo.component.scss'],
  standalone: true,
  imports: [KitDirectivesModule, KitLayoutModule, KitTextModule, CodeBlockComponent, SimpleTableComponent, KitButtonModule]
})
export class PressAndHoldDirectiveDemoComponent {
  timeoutReachedCount: number = 0;

  importModule = `import { KitDirectivesModule } from ' @openkit-labs/ngx-kit-ui';`;
  importComponent = `import { KitPressAndHoldDirective } from ' @openkit-labs/ngx-kit-ui';`;
  usage = `<button (kitPressAndHold)="onHold()">Press and Hold Me</button>`;

  // Outputs Table
  outputsDefinition = [
    { title: 'Output', lookupField: 'output' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Description', lookupField: 'description' }
  ];
  outputsDataset = [
    { output: 'kitPressAndHold', type: 'EventEmitter<void>', description: 'Emitted when the element is pressed and held.' }
  ];

  onHold() {
    // Called when the hold timeout is reached
    this.timeoutReachedCount++;
  }

  // Helper used by the template to iterate N times
  get timeoutArray(): any[] {
    return Array(this.timeoutReachedCount);
  }
}
