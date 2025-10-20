
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KitLayoutModule, KitTextModule, SimpleTableComponent } from '../../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../../shared/code-block/code-block.component';

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [FormsModule, KitLayoutModule, KitTextModule, CodeBlockComponent, SimpleTableComponent],
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent {
  importModule = `import { KitLayoutModule } from ' @openkit-labs/ngx-kit-ui';`;
  importComponent = `import { KitColumnComponent } from ' @openkit-labs/ngx-kit-ui';`;
  usage = `<kit-column [mainAxisAlignment]="'start'" [crossAxisAlignment]="'center'" [gap]="10">
  <!-- Your content here -->
</kit-column>`;

  inputsDefinition = [
    { title: 'Input', lookupField: 'input' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];
  inputsDataset = [
    { input: 'mainAxisAlignment', type: "'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'", default: "'start'", description: 'Controls alignment along the main axis (vertical for column).' },
    { input: 'crossAxisAlignment', type: "'start' | 'center' | 'end' | 'stretch'", default: "'center'", description: 'Controls alignment along the cross axis (horizontal for column).' },
    { input: 'gap', type: 'number', default: "undefined", description: 'Controls the spacing between children in pixels.' },
    { input: 'wrap', type: 'boolean', default: "false", description: 'Controls whether the column should wrap its children.' },
    { input: 'fullWidth', type: 'boolean', default: "false", description: 'Controls whether the column should take up the full width of its parent.' },
    { input: 'fullHeight', type: 'boolean', default: "false", description: 'Controls whether the column should take up the full height of its parent.' },
  ];
}
