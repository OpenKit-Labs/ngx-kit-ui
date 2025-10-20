
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KitLayoutModule, KitTextModule, SimpleTableComponent } from '../../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../../shared/code-block/code-block.component';

@Component({
  selector: 'app-expanded',
  standalone: true,
  imports: [FormsModule, KitLayoutModule, KitTextModule, CodeBlockComponent, SimpleTableComponent],
  templateUrl: './expanded.component.html',
  styleUrls: ['./expanded.component.scss']
})
export class ExpandedComponent {
  importModule = `import { KitLayoutModule } from ' @openkit-labs/ngx-kit-ui';`;
  importComponent = `import { KitExpandedComponent } from ' @openkit-labs/ngx-kit-ui';`;
  usage = `<kit-expanded [flex]="1">
  <!-- Your content here -->
</kit-expanded>`;

  inputsDefinition = [
    { title: 'Input', lookupField: 'input' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];
  inputsDataset = [
    { input: 'flex', type: 'number', default: "1", description: 'The flex factor that determines how much space this expanded element takes relative to other expanded elements.' },
  ];
}
