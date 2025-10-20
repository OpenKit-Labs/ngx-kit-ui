
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KitLayoutModule, KitTextModule, SimpleTableComponent } from '../../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../../shared/code-block/code-block.component';

@Component({
  selector: 'app-constrained-box',
  standalone: true,
  imports: [FormsModule, KitLayoutModule, KitTextModule, CodeBlockComponent, SimpleTableComponent],
  templateUrl: './constrained-box.component.html',
  styleUrls: ['./constrained-box.component.scss']
})
export class ConstrainedBoxComponent {
  importModule = `import { KitLayoutModule } from ' @openkit-labs/ngx-kit-ui';`;
  importComponent = `import { KitContrainedBoxComponent } from ' @openkit-labs/ngx-kit-ui';`;
  usage = `<kit-constrained-box [minWidth]="'100px'" [maxWidth]="'500px'">
  <!-- Your content here -->
</kit-constrained-box>`;

  inputsDefinition = [
    { title: 'Input', lookupField: 'input' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];
  inputsDataset = [
    { input: 'minWidth', type: 'string', default: "undefined", description: 'The minimum width of the component.' },
    { input: 'maxWidth', type: 'string', default: "undefined", description: 'The maximum width of the component.' },
    { input: 'minHeight', type: 'string', default: "undefined", description: 'The minimum height of the component.' },
    { input: 'maxHeight', type: 'string', default: "undefined", description: 'The maximum height of the component.' },
  ];
}
