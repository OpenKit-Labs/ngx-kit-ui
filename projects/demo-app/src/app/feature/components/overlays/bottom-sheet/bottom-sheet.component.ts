import { Component } from '@angular/core';
import { KitOverlaysModule, KitButtonModule, KitLayoutModule, KitTextModule, SimpleTableComponent } from '../../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../../shared/code-block/code-block.component';

@Component({
  selector: 'app-bottom-sheet',
  standalone: true,
  imports: [KitOverlaysModule, KitButtonModule, KitLayoutModule, KitTextModule, CodeBlockComponent, SimpleTableComponent],
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss']
})
export class BottomSheetComponent {
  isBottomSheetOpen = false;
  importModule = `import { KitOverlaysModule } from ' @openkit-labs/ngx-kit-ui';`;
  importComponent = `import { KitBottomSheetComponent } from ' @openkit-labs/ngx-kit-ui';`;
  usage = `<kit-bottom-sheet [(isOpen)]="isBottomSheetOpen">...</kit-bottom-sheet>`;

  inputsDefinition = [
    { title: 'Input', lookupField: 'input' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];

  inputsDataset = [
    { input: 'isOpen', type: 'boolean', default: 'false', description: 'Controls whether the bottom sheet is open or closed.' },
    { input: 'closeOnBackdropClick', type: 'boolean', default: 'true', description: 'Controls whether clicking on the backdrop closes the bottom sheet.' },
    { input: 'padding', type: 'string', default: "'8px'", description: 'Controls the padding of the bottom sheet content.' },
    { input: 'maxHeight', type: '25 | 50 | 75 | 100 | string', default: '50%', description: 'Controls the maximum height of the bottom sheet. Must be one of the predefined snap points: 25, 50, 75, or 100 (%).' }
  ];

  outputsDefinition = [
    { title: 'Output', lookupField: 'output' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Description', lookupField: 'description' }
  ];

  outputsDataset = [
    { output: 'isOpenChange', type: 'EventEmitter<boolean>', description: 'Output event to notify parent component when bottom sheet\'s open state changes.' }
  ];

  stylingDefinition = [
    { title: 'Variable', lookupField: 'variable' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];

  stylingDataset = [
    { variable: '--kit-z-overlay', default: '1000', description: 'The z-index of the bottom sheet backdrop.' },
    { variable: '--kit-background-color', default: '#ffffff', description: 'The background color of the bottom sheet container.' },
    { variable: '--kit-text-color-secondary', default: '#999', description: 'The color of the handle indicator.' }
  ];

  openBottomSheet() {
    this.isBottomSheetOpen = true;
  }

  closeBottomSheet() {
    this.isBottomSheetOpen = false;
  }
}
