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
  usage = `<kit-image src="https://picsum.photos/id/15/600/400"></kit-image>`;

  // Inputs Table
  inputsDefinition = [
    { title: 'Input', lookupField: 'input' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];
  inputsDataset = [
    { input: 'src', type: 'string | null', default: "null", description: "The image source." },
    { input: 'objectFit', type: "'cover' | 'contain' | 'fill' | 'none' | 'scale-down'", default: "'cover'", description: "The CSS object-fit property for the image." },
    { input: 'width', type: 'string', default: "'100%'", description: "The width of the image (CSS value)." },
    { input: 'height', type: 'string', default: "'auto'", description: "The height of the image (CSS value)." },
    { input: 'aspectRatio', type: 'string | null', default: "null", description: "The aspect ratio to maintain (e.g. '16/9')." },
    { input: 'borderRadius', type: 'string | null', default: "null", description: "The border radius of the image (CSS value)." },
    { input: 'errorSrc', type: 'string | null', default: "null", description: "A fallback image source to use if loading the main image fails." }
  ];

  // Styling Variables Table
  stylingDefinition = [
    { title: 'Variable', lookupField: 'variable' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];
  stylingDataset = [
    { variable: '--kit-image-border-radius', default: '12px', description: 'The border radius of the image (CSS value).' },
  ];

  onLoadNewImage() {
    this.randomImageSrc = `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/600/400`;
  }
}