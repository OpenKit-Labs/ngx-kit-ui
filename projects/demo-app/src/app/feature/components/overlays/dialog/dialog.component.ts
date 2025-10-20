import { Component } from '@angular/core';
import { KitOverlaysModule, KitButtonModule, KitLayoutModule, KitTextModule, SimpleTableComponent } from '../../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../../shared/code-block/code-block.component';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [KitOverlaysModule, KitButtonModule, KitLayoutModule, KitTextModule, CodeBlockComponent, SimpleTableComponent],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  isDialogOpen = false;
  importModule = `import { KitOverlaysModule } from ' @openkit-labs/ngx-kit-ui';`;
  importComponent = `import { KitDialogComponent } from ' @openkit-labs/ngx-kit-ui';`;
  usage = `<kit-dialog [(isOpen)]="isDialogOpen">...</kit-dialog>`;

  inputsDefinition = [
    { title: 'Input', lookupField: 'input' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];

  inputsDataset = [
    { input: 'isOpen', type: 'boolean', default: 'false', description: 'Controls whether the dialog is open or closed.' },
    { input: 'fullscreen', type: 'boolean', default: 'undefined', description: 'Controls whether the dialog should be displayed in fullscreen mode. If not provided, it will be determined based on screen size.' },
    { input: 'closeOnBackdropClick', type: 'boolean', default: 'true', description: 'Controls whether clicking on the backdrop closes the dialog.' },
    { input: 'padding', type: 'string', default: "'16px'", description: 'Controls the padding of the dialog content.' }
  ];

  outputsDefinition = [
    { title: 'Output', lookupField: 'output' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Description', lookupField: 'description' }
  ];

  outputsDataset = [
    { output: 'isOpenChange', type: 'EventEmitter<boolean>', description: 'Output event to notify parent component when dialog\'s open state changes.' }
  ];

  stylingDefinition = [
    { title: 'Variable', lookupField: 'variable' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];

  stylingDataset = [
    { variable: '--kit-z-overlay', default: '1000', description: 'The z-index of the dialog backdrop.' },
    { variable: '--kit-background-color', default: '#ffffff', description: 'The background color of the dialog container.' }
  ];

  openDialog() {
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
  }
}
