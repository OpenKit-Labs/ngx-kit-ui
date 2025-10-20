import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KitLayoutModule, KitTextModule } from '../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../shared/code-block/code-block.component';

@Component({
    selector: 'app-getting-started',
    standalone: true,
    imports: [RouterModule, KitLayoutModule, KitTextModule, CodeBlockComponent],
    templateUrl: './getting-started.component.html',
    styleUrls: ['./getting-started.component.scss']
})
export class GettingStartedComponent {

    appRootCode = `<kit-app-root>

    <kit-side-menu>

       <!-- Sidebar content goes here -->

    </kit-side-menu>


    <kit-top-bar>

       <!-- Top bar content goes here -->

    </kit-top-bar>

    <kit-router-outlet></kit-router-outlet>

</kit-app-root>`;

}
