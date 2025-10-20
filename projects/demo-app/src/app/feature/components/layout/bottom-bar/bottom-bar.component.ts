import { Component } from '@angular/core';
import { KitTextModule, KitLayoutModule, KitNavigationModule } from '../../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../../shared/code-block/code-block.component';
import { HostShellComponent } from "../../../../core/components/host-shell/host-shell.component";

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss'],
  standalone: true,
  imports: [
    KitTextModule,
    KitLayoutModule,
    KitNavigationModule,
    CodeBlockComponent,
    HostShellComponent
  ]
})
export class BottomBarComponent {
  importModule = `import { NavigationModule } from ' @openkit-labs/ngx-kit-ui';`;
  importComponent = `import { BottomBarComponent } from ' @openkit-labs/ngx-kit-ui';`;
  usage = `<kit-bottom-bar>
  <button kitButton>Action 1</button>
  <button kitButton>Action 2</button>
</kit-bottom-bar>`;
}