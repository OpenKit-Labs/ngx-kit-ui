import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KitLayoutModule, KitTextModule, SimpleTableComponent } from '../../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../../shared/code-block/code-block.component';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [FormsModule, KitLayoutModule, KitTextModule, CodeBlockComponent, SimpleTableComponent],
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent {
  importModule = `import { KitLayoutModule } from ' @openkit-labs/ngx-kit-ui';`;
  importComponent = `import { KitContainerComponent } from ' @openkit-labs/ngx-kit-ui';`;
  usage = `<kit-container [width]="200" [height]="200" [color]="'#f0f0f0'">
  <!-- Your content here -->
</kit-container>`;

  exampleCode = `
      <kit-container 
                width="200px"
                height="200px"
                backgroundColor="red"
                borderRadius="10px"
                border="2px dashed orange"
                boxShadow="rgba(255, 0, 0, 0.5) 15px 15px 5px">
          <kit-center>
              <kit-text-body>Hello, World!</kit-text-body>
          </kit-center>
      </kit-container>`;

  inputsDefinition = [
    { title: 'Input', lookupField: 'input' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];
  inputsDataset = [
    { input: 'width', type: 'number', default: "undefined", description: 'The width of the container in pixels.' },
    { input: 'height', type: 'number', default: "undefined", description: 'The height of the container in pixels.' },
    { input: 'minWidth', type: 'number', default: "undefined", description: 'The minimum width of the container in pixels.' },
    { input: 'minHeight', type: 'number', default: "undefined", description: 'The minimum height of the container in pixels.' },
    { input: 'maxWidth', type: 'number', default: "undefined", description: 'The maximum width of the container in pixels.' },
    { input: 'maxHeight', type: 'number', default: "undefined", description: 'The maximum height of the container in pixels.' },
    { input: 'padding', type: 'number | string', default: "undefined", description: 'The padding of the container.' },
    { input: 'margin', type: 'number | string', default: "undefined", description: 'The margin of the container.' },
    { input: 'color', type: 'string', default: "undefined", description: 'The background color of the container.' },
    { input: 'borderRadius', type: 'number', default: "undefined", description: 'The border radius of the container.' },
    { input: 'boxShadow', type: 'string', default: "undefined", description: 'The box shadow of the container.' },
    { input: 'border', type: 'string', default: "undefined", description: 'The border of the container.' },
  ];
}
