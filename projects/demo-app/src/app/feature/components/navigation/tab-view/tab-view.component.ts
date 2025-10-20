import { Component } from '@angular/core';
import { KitLayoutModule, KitNavigationModule, KitTextModule, SimpleTableComponent } from '../../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../../shared/code-block/code-block.component';

@Component({
  selector: 'app-tab-view',
  standalone: true,
  imports: [
    KitTextModule,
    KitLayoutModule,
    KitNavigationModule,
    CodeBlockComponent,
    SimpleTableComponent,
  ],
  templateUrl: './tab-view.component.html',
  styleUrls: ['./tab-view.component.scss']
})
export class TabViewComponent {
  importModule = `import { KitNavigationModule } from ' @openkit-labs/ngx-kit-ui';`;
  importComponent = `import { KitTabViewComponent } from ' @openkit-labs/ngx-kit-ui';`;
  usage = `<kit-tab-view>
  <kit-tab-content title="Tab 1">
    <!-- Content for Tab 1 -->
  </kit-tab-content>
  <kit-tab-content title="Tab 2">
    <!-- Content for Tab 2 -->
  </kit-tab-content>
</kit-tab-view>`;

  // Inputs Table
  inputsDefinition = [
    { title: 'Input', lookupField: 'input' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];
  inputsDataset = [
    { input: 'tabs', type: 'Tab[]', default: '[]', description: 'An array of tabs to be displayed dynamically.' },
    { input: 'activeTabIndex', type: 'number', default: '0', description: 'The index of the initially active tab.' }
  ];

  // Outputs Table
  outputsDefinition = [
    { title: 'Output', lookupField: 'output' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Description', lookupField: 'description' }
  ];
  outputsDataset = [
    { output: 'tabChange', type: 'EventEmitter<Tab>', description: 'Emitted when the active tab changes.' }
  ];

  // Styling Variables Table
  stylingDefinition = [
    { title: 'Variable', lookupField: 'variable' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];
  stylingDataset = [
    {
      variable: '--kit-input-padding',
      default: '16px',
      description: 'Padding used for spacing in tab headers.'
    },
    {
      variable: '--kit-font-size-body',
      default: '1rem',
      description: 'Base font size for tab item text.'
    },
    {
      variable: '--kit-font-weight-body',
      default: '400',
      description: 'Font weight for regular tab item text.'
    },
    {
      variable: '--kit-line-height-body',
      default: '1.5',
      description: 'Line height for tab item text.'
    },
    {
      variable: '--kit-text-color-secondary',
      default: '#6c757d',
      description: 'Secondary text color used for inactive tab items.'
    },
    {
      variable: '--kit-color-primary',
      default: '#0066cc',
      description: 'Primary brand color used for active and hover states.'
    },
    {
      variable: '--kit-font-weight-label',
      default: '500',
      description: 'Font weight for active tab labels.'
    }
  ];


  // Tab Content Inputs Table
  tabContentInputsDefinition = [
    { title: 'Input', lookupField: 'input' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];
  tabContentInputsDataset = [
    { input: 'title', type: 'string', default: "''", description: 'The title of the tab.' },
    { input: 'active', type: 'boolean', default: 'false', description: 'Whether the tab is currently active.' },
    { input: 'disabled', type: 'boolean', default: 'false', description: 'Whether the tab is disabled.' }
  ];
}
