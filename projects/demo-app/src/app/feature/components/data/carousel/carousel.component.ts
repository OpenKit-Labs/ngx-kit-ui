import { Component } from '@angular/core';
import { KitDataModule, KitLayoutModule, KitTextModule, SimpleTableComponent } from '../../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../../shared/code-block/code-block.component';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [KitLayoutModule, KitDataModule, KitTextModule, CodeBlockComponent, SimpleTableComponent],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
  importModule = `import { KitDataModule } from ' @openkit-labs/ngx-kit-ui';`;
  importComponent = `import { KitCarouselComponent } from ' @openkit-labs/ngx-kit-ui';`;
  usage = `<kit-carousel>
  <div>
    <h3>First slide</h3>
    <p>Content of the first slide.</p>
  </div>
  <div>
    <h3>Second slide</h3>
    <p>Content of the second slide.</p>
  </div>
</kit-carousel>`;

  inputsDefinition = [
    { title: 'Input', lookupField: 'input' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];
  inputsDataset = [];

  outputsDefinition = [
    { title: 'Output', lookupField: 'output' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Description', lookupField: 'description' }
  ];
  outputsDataset = [];

  stylingDefinition = [
    { title: 'Variable', lookupField: 'variable' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];
  stylingDataset = [
    { variable: '--kit-carousel-scroll-snap-type', default: 'x mandatory', description: 'The scroll snap type of the carousel.' },
  ];

}