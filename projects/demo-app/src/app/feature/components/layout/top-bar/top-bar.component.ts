import { Component } from '@angular/core';
import { KitLayoutModule, KitTextModule } from '../../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../../shared/code-block/code-block.component';
import { HostShellComponent } from "../../../../core/components/host-shell/host-shell.component";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  standalone: true,
  imports: [
    KitTextModule,
    KitLayoutModule,
    CodeBlockComponent,
    HostShellComponent,
  ]
})
export class TopBarComponent {
  importModule = `import { NavigationModule } from ' @openkit-labs/ngx-kit-ui';`;
  importComponent = `import { AppBarComponent } from ' @openkit-labs/ngx-kit-ui';`;
  usage = `<kit-top-bar title="App Bar"></kit-top-bar>`;
}
