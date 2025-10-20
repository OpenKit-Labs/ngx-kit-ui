import { Component } from '@angular/core';
import { KitLayoutModule, KitMediaModule, KitTextModule, SimpleTableComponent, KitButtonModule } from '../../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../../shared/code-block/code-block.component';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [KitLayoutModule, KitMediaModule, KitTextModule, CodeBlockComponent, SimpleTableComponent, KitButtonModule],
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {

  randomImageSrc = 'https://picsum.photos/id/15/600/400';

  importModule = `import { KitMediaModule } from ' @openkit-labs/ngx-kit-ui';`;
  importComponent = `import { KitImageComponent } from ' @openkit-labs/ngx-kit-ui';`;
  usage = `<kit-image src="https://picsum.photos/id/15/600/400" alt="A beautiful landscape"></kit-image>`;

  // Inputs Table
  inputsDefinition = [
    { title: 'Input', lookupField: 'input' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];
  inputsDataset = [
    { input: 'src', type: 'string', default: "''", description: "The image source." },
    { input: 'alt', type: 'string', default: "''", description: 'The alternative text for the image.' },
    { input: 'width', type: 'string | number', default: "'auto'", description: 'The width of the image.' },
    { input: 'height', type: 'string | number', default: "'auto'", description: 'The height of the image.' },
    { input: 'fit', type: "'fill' | 'contain' | 'cover' | 'none' | 'scale-down'", default: "'cover'", description: 'How the image should fit within its container.' },
    { input: 'priority', type: 'boolean', default: 'false', description: 'Whether the image should be loaded eagerly.' },
    { input: 'borderRadius', type: 'string | number', default: "0", description: 'The border radius of the image.' },
  ];

  // Outputs Table
  outputsDefinition = [
    { title: 'Output', lookupField: 'output' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Description', lookupField: 'description' }
  ];
  outputsDataset = [
    { output: 'loaded', type: 'EventEmitter<void>', description: 'Emitted when the image has finished loading.' },
    { output: 'error', type: 'EventEmitter<void>', description: 'Emitted when an error occurs while loading the image.' }
  ];

  // Styling Variables Table
  stylingDefinition = [
    { title: 'Variable', lookupField: 'variable' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];
  stylingDataset = [
    { variable: '--kit-image-loading-background', default: '#f0f0f0', description: 'Background color of the loading placeholder.' },
    { variable: '--kit-image-error-background', default: '#f0f0f0', description: 'Background color of the error placeholder.' },
    { variable: '--kit-image-error-color', default: '#ff0000', description: 'Color of the error icon.' }
  ];

  // Directives
  directivesDefinition = [
    { title: 'Directive', lookupField: 'directive' },
    { title: 'Description', lookupField: 'description' }
  ];
  directivesDataset = [
    { directive: '[kitImageLoading]', description: 'A directive to provide a custom loading template.' },
    { directive: '[kitImageError]', description: 'A directive to provide a custom error template.' }
  ];

  customLoadingUsage = `
<kit-image src="https://picsum.photos/id/1/600/400" width="300" height="200" alt="A beautiful landscape">
  <ng-template kitImageLoading>
     <kit-container border="1px dashed gray" padding="10px">
          <kit-text-caption>Loading...</kit-text-caption>
      </kit-container>
  </ng-template>
</kit-image>
  `;

  customErrorUsage = `
<kit-image src="https://thissourcedoesnotexist.com/image.png" width="300" height="200" alt="A beautiful landscape">
  <ng-template kitImageError>
    <kit-container border="1px dashed gray" padding="10px">
          <kit-text-caption>Error loading image.</kit-text-caption>
      </kit-container>
  </ng-template>
</kit-image>
  `;

  onLoadNewImage() {
    this.randomImageSrc = `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/600/400`;
  }
}