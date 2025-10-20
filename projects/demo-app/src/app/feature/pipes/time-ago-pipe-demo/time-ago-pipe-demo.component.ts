import { Component } from '@angular/core';
import { KitPipesModule, KitLayoutModule, KitTextModule, SimpleTableComponent } from '../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../shared/code-block/code-block.component';

@Component({
  selector: 'app-time-ago-pipe-demo',
  templateUrl: './time-ago-pipe-demo.component.html',
  styleUrls: ['./time-ago-pipe-demo.component.scss'],
  standalone: true,
  imports: [KitPipesModule, KitLayoutModule, KitTextModule, CodeBlockComponent, SimpleTableComponent]
})
export class TimeAgoPipeDemoComponent {
  date = new Date();
  exampleDates = [
    new Date(new Date().getTime() - 1000 * 60 * 5),
    new Date(new Date().getTime() - 1000 * 60 * 60),
    new Date(new Date().getTime() - 1000 * 60 * 60 * 24),
    new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7),
    new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 30),
    new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 365),
  ];
  importModule = `import { KitPipesModule } from ' @openkit-labs/ngx-kit-ui';`;
  importComponent = `import { KitTimeAgoPipe } from ' @openkit-labs/ngx-kit-ui';`;
  usage = `<p>{{ date | kitTimeAgo }}</p>`;

  // Inputs Table
  inputsDefinition = [
    { title: 'Input', lookupField: 'input' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];
  inputsDataset = [
    { input: 'value', type: 'any', default: '-', description: 'The date to format.' }
  ];
}
