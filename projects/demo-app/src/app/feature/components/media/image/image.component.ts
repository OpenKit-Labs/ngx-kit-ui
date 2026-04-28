import { Component, signal } from '@angular/core';
import { KitLayoutModule, KitMediaModule, KitTextModule, SimpleTableComponent, KitButtonModule, KitDataModule, KitOverlaysModule } from '../../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../../shared/code-block/code-block.component';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [KitLayoutModule, KitMediaModule, KitTextModule, CodeBlockComponent, SimpleTableComponent, KitButtonModule, NgIconComponent, KitDataModule, KitOverlaysModule],
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {

  randomImageSrc = 'https://picsum.photos/id/15/600/400';
  
  // Simulate slow loading for demo
  slowLoadingImageSrc = signal<string | null>(null);
  
  // Base64 sample (small red square PNG)
  base64ImageSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg==';

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
    { input: 'src', type: 'string | null', default: "null", description: "The image source (HTTP URL or base64 data URL)." },
    { input: 'objectFit', type: "'cover' | 'contain' | 'fill' | 'none' | 'scale-down'", default: "'cover'", description: "The CSS object-fit property for the image." },
    { input: 'width', type: 'string', default: "'100%'", description: "The width of the image (any CSS value: 100%, 300px, 100vw, etc)." },
    { input: 'height', type: 'string', default: "'auto'", description: "The height of the image (any CSS value: 200px, 100vh, 50%, etc)." },
    { input: 'aspectRatio', type: 'string | null', default: "null", description: "The aspect ratio to maintain (e.g. '16/9')." },
    { input: 'borderRadius', type: 'string | null', default: "null", description: "The border radius of the image (CSS value)." },
    { input: 'errorSrc', type: 'string | null', default: "null", description: "A fallback image source to use if loading the main image fails." },
    { input: 'loadingTemplate', type: 'TemplateRef<void> | null', default: "null", description: "Custom template to display while image is loading. If not provided, uses default shimmer." },
    { input: 'errorTemplate', type: 'TemplateRef<void> | null', default: "null", description: "Custom template to display if image fails to load. If not provided, uses default error state." }
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

  onSimulateSlowLoad() {
    this.slowLoadingImageSrc.set(null);
    // Simulate 3 second delay
    setTimeout(() => {
      this.slowLoadingImageSrc.set('https://picsum.photos/id/42/600/400');
    }, 3000);
  }
}