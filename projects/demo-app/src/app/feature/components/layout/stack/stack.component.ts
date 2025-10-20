import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KitLayoutModule, KitTextModule, SimpleTableComponent } from '../../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../../shared/code-block/code-block.component';

@Component({
  selector: 'app-stack',
  standalone: true,
  imports: [FormsModule, KitLayoutModule, KitTextModule, CodeBlockComponent, SimpleTableComponent],
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.scss']
})
export class StackComponent {
  importModule = `import { KitLayoutModule } from ' @openkit-labs/ngx-kit-ui';`;
  importComponent = `import { KitStackComponent } from ' @openkit-labs/ngx-kit-ui';`;
  usage = `<kit-stack [alignment]="'center'" [fit]="'loose'" [clip]="true">
  <!-- Your content here -->
</kit-stack>`;

  inputsDefinition = [
    { title: 'Input', lookupField: 'input' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];
  inputsDataset = [
    { input: 'alignment', type: "'top-start' | 'top-center' | 'top-end' | 'center-start' | 'center' | 'center-end' | 'bottom-start' | 'bottom-center' | 'bottom-end'", default: "'top-start'", description: 'Controls how to align the non-positioned and partially-positioned children in the stack.' },
    { input: 'fit', type: "'loose' | 'expand'", default: "'loose'", description: 'How to size the non-positioned children in the stack.' },
    { input: 'clip', type: 'boolean', default: "true", description: 'Whether to clip the children of the stack.' },
  ];
}
