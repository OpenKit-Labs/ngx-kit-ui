import { Component } from '@angular/core';
import { KitButtonModule, KitLayoutModule, KitTextModule } from '../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../shared/code-block/code-block.component';

@Component({
  selector: 'app-installation',
  standalone: true,
  imports: [KitLayoutModule, KitTextModule, CodeBlockComponent, KitButtonModule],
  templateUrl: './installation.component.html',
  styleUrl: './installation.component.scss'
})
export class InstallationComponent {
  installationCode = `npm install ngx-kit-ui`;
  customFontCode = `@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');\n\nbody {\n  font-family: 'Roboto', sans-serif;\n}`;
}
