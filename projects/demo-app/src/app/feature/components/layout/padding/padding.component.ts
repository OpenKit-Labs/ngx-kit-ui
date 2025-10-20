
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KitLayoutModule, KitTextModule, SimpleTableComponent } from '../../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../../shared/code-block/code-block.component';

@Component({
  selector: 'app-padding',
  standalone: true,
  imports: [FormsModule, KitLayoutModule, KitTextModule, CodeBlockComponent, SimpleTableComponent],
  templateUrl: './padding.component.html',
  styleUrls: ['./padding.component.scss']
})
export class PaddingComponent {
  importModule = `import { KitLayoutModule } from ' @openkit-labs/ngx-kit-ui';`;
  importComponent = `import { KitPaddingComponent } from ' @openkit-labs/ngx-kit-ui';`;
  usage = `<kit-padding [all]="16">
  <!-- Your content here -->
</kit-padding>`;

  inputsDefinition = [
    { title: 'Input', lookupField: 'input' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];
  inputsDataset = [
    { input: 'top', type: 'number', default: "4", description: 'The padding on the top side.' },
    { input: 'bottom', type: 'number', default: "4", description: 'The padding on the bottom side.' },
    { input: 'left', type: 'number', default: "4", description: 'The padding on the left side.' },
    { input: 'right', type: 'number', default: "4", description: 'The padding on the right side.' },
    { input: 'x', type: 'number', default: "undefined", description: 'Shorthand for left and right padding.' },
    { input: 'y', type: 'number', default: "undefined", description: 'Shorthand for top and bottom padding.' },
  ];
}
