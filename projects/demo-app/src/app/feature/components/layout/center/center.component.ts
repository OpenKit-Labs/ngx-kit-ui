
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KitLayoutModule, KitTextModule, SimpleTableComponent } from '../../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../../shared/code-block/code-block.component';

@Component({
  selector: 'app-center',
  standalone: true,
  imports: [FormsModule, KitLayoutModule, KitTextModule, CodeBlockComponent, SimpleTableComponent],
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.scss']
})
export class CenterComponent {
  importModule = `import { KitLayoutModule } from ' @openkit-labs/ngx-kit-ui';`;
  importComponent = `import { KitCenterComponent } from ' @openkit-labs/ngx-kit-ui';`;
  usage = `<kit-center [widthFill]="true" [heightFill]="true">
  <!-- Your content here -->
</kit-center>`;

  inputsDefinition = [
    { title: 'Input', lookupField: 'input' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];
  inputsDataset = [
    { input: 'widthFill', type: 'boolean', default: "true", description: 'Controls whether the component should take up the full width of its parent.' },
    { input: 'heightFill', type: 'boolean', default: "true", description: 'Controls whether the component should take up the full height of its parent.' },
  ];
}
