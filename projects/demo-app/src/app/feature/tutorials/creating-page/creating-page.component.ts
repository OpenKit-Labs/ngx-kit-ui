import { Component } from '@angular/core';
import { KitButtonModule, KitLayoutModule, KitTextModule } from '../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../shared/code-block/code-block.component';

@Component({
  selector: 'app-creating-page',
  standalone: true,
  imports: [KitLayoutModule, KitTextModule, CodeBlockComponent, KitButtonModule],
  templateUrl: './creating-page.component.html',
  styleUrl: './creating-page.component.scss'
})
export class CreatingPageComponent {
  creatingPageCode = `<kit-page>

    <kit-column [gap]="32"
                mainAxisAlignment="center"
                crossAxisAlignment="center"
                [fullWidth]="true">

        <ng-container>
            <kit-text-display>NGX Kit UI</kit-text-display>
            <kit-text-subheading [align]="'center'">Welcom to NGX Kit UI</kit-text-subheading>
        </ng-container>
        
    </kit-column>

</kit-page>`;
}
