
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KitLayoutModule, KitTextModule, SimpleTableComponent } from '../../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../../shared/code-block/code-block.component';

@Component({
  selector: 'app-row',
  standalone: true,
  imports: [FormsModule, KitLayoutModule, KitTextModule, CodeBlockComponent, SimpleTableComponent],
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent {
  importModule = `import { KitLayoutModule } from ' @openkit-labs/ngx-kit-ui';`;
  importComponent = `import { KitRowComponent } from ' @openkit-labs/ngx-kit-ui';`;
  usage = `<kit-row [mainAxisAlignment]="'start'" [crossAxisAlignment]="'center'" [gap]="10">
  <!-- Your content here -->
</kit-row>`;

  inputsDefinition = [
    { title: 'Input', lookupField: 'input' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];
  inputsDataset = [
    { input: 'mainAxisAlignment', type: "'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'", default: "'start'", description: 'Controls alignment along the main axis (horizontal for row).' },
    { input: 'crossAxisAlignment', type: "'start' | 'center' | 'end' | 'stretch'", default: "'center'", description: 'Controls alignment along the cross axis (vertical for row).' },
    { input: 'gap', type: 'number', default: "undefined", description: 'Controls the spacing between children in pixels.' },
    { input: 'wrap', type: 'boolean', default: "false", description: 'Controls whether the row should wrap its children.' },
    { input: 'fullWidth', type: 'boolean', default: "false", description: 'Controls whether the row should take up the full width of its parent.' },
    { input: 'fullHeight', type: 'boolean', default: "false", description: 'Controls whether the row should take up the full height of its parent.' },
  ];
}
