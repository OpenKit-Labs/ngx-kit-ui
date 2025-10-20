import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KitInputModule, KitLayoutModule, KitTextModule } from '../../../../../../../ngx-kit-ui/src/public-api';

@Component({
  selector: 'app-multi-select',
  standalone: true,
  imports: [FormsModule, KitInputModule, KitLayoutModule, KitTextModule],
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent {

}
