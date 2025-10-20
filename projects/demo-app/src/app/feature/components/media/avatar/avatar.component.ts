import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KitLayoutModule, KitTextModule, KitMediaModule, SimpleTableComponent } from '../../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../../shared/code-block/code-block.component';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [FormsModule, KitLayoutModule, KitTextModule, KitMediaModule, CodeBlockComponent, SimpleTableComponent],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {
  importModule = `import { KitMediaModule } from ' @openkit-labs/ngx-kit-ui';`;
  importComponent = `import { KitAvatarComponent } from ' @openkit-labs/ngx-kit-ui';`;
  usage = `<kit-avatar [src]="'path/to/your/image.jpg'" [alt]="'Avatar Image'" [size]="40" [shape]="'circle'"></kit-avatar>`;

  inputsDefinition = [
    { title: 'Input', lookupField: 'input' },
    { title: 'Type', lookupField: 'type' },
    { title: 'Default', lookupField: 'default' },
    { title: 'Description', lookupField: 'description' }
  ];
  inputsDataset = [
    { input: 'src', type: 'string', default: "''", description: 'The source of the image.' },
    { input: 'alt', type: 'string', default: "''", description: 'The alt text for the image.' },
    { input: 'size', type: 'number', default: "40", description: 'The size of the avatar in pixels.' },
    { input: 'borderRadius', type: 'string | number', default: "var(--kit-avatar-border-radius)", description: 'The border radius of the avatar.' },
  ];
}
