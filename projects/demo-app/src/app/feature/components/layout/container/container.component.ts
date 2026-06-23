import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KitLayoutModule, KitTextModule, SimpleTableComponent } from '../../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../../shared/code-block/code-block.component';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [FormsModule, KitLayoutModule, KitTextModule, CodeBlockComponent, SimpleTableComponent],
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent {
  importModule = `import { KitLayoutModule } from ' @openkit-labs/ngx-kit-ui';`;
  importComponent = `import { KitContainerComponent } from ' @openkit-labs/ngx-kit-ui';`;
  usage = `<kit-page>
  <kit-container>
    <!-- Content constrained by breakpoints -->
    <kit-text-body>This respects breakpoints.</kit-text-body>
  </kit-container>

  <!-- Full-width content outside the container -->
  <div class="full-width-hero">...</div>
</kit-page>`;

  fullWidthExample = `<kit-container [fullWidth]="true">
  <!-- This content spans the full width -->
  <kit-text-body>No breakpoints applied.</kit-text-body>
</kit-container>`;

  inputsDefinition = [
    { title: 'Input', lookupField: 'input' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];
  inputsDataset = [
    { input: 'fullWidth', type: 'boolean', default: 'false', description: 'When true, disables the responsive max-width so content spans the full parent width.' },
  ];

  breakpointsDefinition = [
    { title: 'Screen Size', lookupField: 'size' },
    { title: 'Max Width', lookupField: 'maxWidth' },
  ];
  breakpointsDataset = [
    { size: 'small', maxWidth: '600px' },
    { size: 'medium', maxWidth: '960px' },
    { size: 'large', maxWidth: '1200px' },
  ];
}
