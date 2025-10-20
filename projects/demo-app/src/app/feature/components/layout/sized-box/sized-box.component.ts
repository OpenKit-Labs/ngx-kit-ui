
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KitLayoutModule, KitTextModule, SimpleTableComponent } from '../../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../../shared/code-block/code-block.component';

@Component({
  selector: 'app-sized-box',
  standalone: true,
  imports: [FormsModule, KitLayoutModule, KitTextModule, CodeBlockComponent, SimpleTableComponent],
  templateUrl: './sized-box.component.html',
  styleUrls: ['./sized-box.component.scss']
})
export class SizedBoxComponent {
  importModule = `import { KitLayoutModule } from ' @openkit-labs/ngx-kit-ui';`;
  importComponent = `import { KitSizedBoxComponent } from ' @openkit-labs/ngx-kit-ui';`;
  usage = `<kit-sized-box [width]="100" [height]="100">
  <!-- Your content here -->
</kit-sized-box>`;

  inputsDefinition = [
    { title: 'Input', lookupField: 'input' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];
  inputsDataset = [
    { input: 'width', type: 'number', default: "undefined", description: 'The width of the box in pixels.' },
    { input: 'height', type: 'number', default: "undefined", description: 'The height of the box in pixels.' },
  ];
}
