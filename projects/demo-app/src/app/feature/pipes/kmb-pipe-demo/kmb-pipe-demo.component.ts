import { Component } from '@angular/core';
import { KitPipesModule, KitLayoutModule, KitTextModule, SimpleTableComponent } from '../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../shared/code-block/code-block.component';

@Component({
  selector: 'app-kmb-pipe-demo',
  templateUrl: './kmb-pipe-demo.component.html',
  styleUrls: ['./kmb-pipe-demo.component.scss'],
  standalone: true,
  imports: [KitPipesModule, KitLayoutModule, KitTextModule, CodeBlockComponent, SimpleTableComponent]
})
export class KmbPipeDemoComponent {
  number = 1234567;
  exampleNumbers = [1000, 2500, 10000, 1000000, 2500000, 1000000000];
  importModule = `import { KitPipesModule } from ' @openkit-labs/ngx-kit-ui';`;
  importComponent = `import { KitKMBPipe } from ' @openkit-labs/ngx-kit-ui';`;
  usage = `<p>{{ number | kitKmb }}</p>`;

  // Inputs Table
  inputsDefinition = [
    { title: 'Input', lookupField: 'input' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];
  inputsDataset = [
    { input: 'value', type: 'any', default: '-', description: 'The number to format.' }
  ];
}
