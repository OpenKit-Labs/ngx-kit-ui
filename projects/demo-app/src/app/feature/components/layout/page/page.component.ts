
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KitLayoutModule, KitTextModule, SimpleTableComponent } from '../../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../../shared/code-block/code-block.component';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [FormsModule, KitLayoutModule, KitTextModule, CodeBlockComponent, SimpleTableComponent],
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent {
  importModule = `import { KitLayoutModule } from ' @openkit-labs/ngx-kit-ui';`;
  importComponent = `import { KitPageComponent } from ' @openkit-labs/ngx-kit-ui';`;
  usage = `<kit-page>
  <kit-top-bar>...</kit-top-bar>

  <kit-container>
    <!-- Breakpoint-constrained content -->
  </kit-container>

  <div class="full-width-hero">
    <!-- Full-width content outside container -->
  </div>

  <kit-bottom-bar>...</kit-bottom-bar>
</kit-page>`;

  pullToRefreshExample = `<kit-page [pullDownThreshold]="150"
           (refreshTriggered)="onRefresh()">
  <!-- Pull down from the top to trigger refresh -->
</kit-page>`;

  noScrollExample = `<kit-page [noScroll]="true">
  <!-- Full-screen, non-scrollable layout -->
</kit-page>`;

  inputsDefinition = [
    { title: 'Input', lookupField: 'input' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];
  inputsDataset = [
    { input: 'pullDownThreshold', type: 'number', default: '0', description: 'Distance in pixels to trigger pull-to-refresh. 0 disables the feature.' },
    { input: 'noScroll', type: 'boolean', default: 'false', description: 'When true, prevents scrolling and makes the page fill the viewport. Useful for login/full-screen layouts.' },
  ];

  outputsDefinition = [
    { title: 'Output', lookupField: 'output' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Description', lookupField: 'description' }
  ];
  outputsDataset = [
    { output: 'pullPercentageChange', type: 'EventEmitter<number>', description: 'Emits 0-100 as the user pulls down, representing progress toward the threshold.' },
    { output: 'refreshTriggered', type: 'EventEmitter<void>', description: 'Emits when the pull distance exceeds pullDownThreshold.' },
  ];

  contentSlotsDefinition = [
    { title: 'Selector', lookupField: 'selector' },
    { title: 'Description', lookupField: 'description' }
  ];
  contentSlotsDataset = [
    { selector: 'kit-top-bar', description: 'Projects into the sticky page header.' },
    { selector: 'kit-bottom-bar', description: 'Projects into the sticky page footer.' },
    { selector: '[slot=pull-to-refresh]', description: 'Custom template for the pull-to-refresh indicator.' },
    { selector: '(default)', description: 'All other content projects into the scrollable page body.' },
  ];
}
