import { Component } from '@angular/core';
import { KitPipesModule, KitLayoutModule, KitTextModule, SimpleTableComponent } from '../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../shared/code-block/code-block.component';

@Component({
  selector: 'app-file-size-pipe-demo',
  templateUrl: './file-size-pipe-demo.component.html',
  styleUrls: ['./file-size-pipe-demo.component.scss'],
  standalone: true,
  imports: [KitPipesModule, KitLayoutModule, KitTextModule, CodeBlockComponent, SimpleTableComponent]
})
export class FileSizePipeDemoComponent {
  bytes = 123456789;
  exampleBytes = [1024, 2048, 5120, 10240, 102400, 1048576, 1073741824];
  importModule = `import { KitPipesModule } from ' @openkit-labs/ngx-kit-ui';`;
  importComponent = `import { KitFileSizePipe } from ' @openkit-labs/ngx-kit-ui';`;
  usage = `<p>{{ bytes | kitFileSize }}</p>
<p>{{ bytes | kitFileSize:4 }}</p>`;

  // Inputs Table
  inputsDefinition = [
    { title: 'Input', lookupField: 'input' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];
  inputsDataset = [
    { input: 'bytes', type: 'number', default: '-', description: 'The number of bytes to format.' },
    { input: 'decimals', type: 'number', default: '2', description: 'The number of decimal places to display.' }
  ];
}
