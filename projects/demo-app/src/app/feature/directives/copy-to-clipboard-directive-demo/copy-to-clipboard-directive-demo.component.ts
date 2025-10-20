import { Component } from '@angular/core';
import { KitDirectivesModule, KitLayoutModule, KitTextModule, SimpleTableComponent, KitButtonModule } from '../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../shared/code-block/code-block.component';

@Component({
  selector: 'app-copy-to-clipboard-directive-demo',
  templateUrl: './copy-to-clipboard-directive-demo.component.html',
  styleUrls: ['./copy-to-clipboard-directive-demo.component.scss'],
  standalone: true,
  imports: [KitDirectivesModule, KitLayoutModule, KitTextModule, CodeBlockComponent, SimpleTableComponent, KitButtonModule]
})
export class CopyToClipboardDirectiveDemoComponent {

  showMessage = false;

  importModule = `import { KitDirectivesModule } from ' @openkit-labs/ngx-kit-ui';`;
  importComponent = `import { KitCopyToClipboardDirective } from ' @openkit-labs/ngx-kit-ui';`;
  usage = `<button kitCopyToClipboard="Hello World!" (copied)="onCopy($event)">Copy</button>`;

  // Inputs Table
  inputsDefinition = [
    { title: 'Input', lookupField: 'input' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];
  inputsDataset = [
    { input: 'kitCopyToClipboard', type: 'string', default: '-', description: 'The text to copy to the clipboard.' },
  ];

  // Outputs Table
  outputsDefinition = [
    { title: 'Output', lookupField: 'output' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Description', lookupField: 'description' }
  ];
  outputsDataset = [
    { output: 'copied', type: 'EventEmitter<string>', description: 'Emitted when the text is copied to the clipboard.' }
  ];

  onCopy(text: string) {
    this.showMessage = true;
  }
}
