import { Component } from '@angular/core';
import { KitLayoutModule, KitButtonModule, KitPanelModule, KitTextModule, KitNavigationModule, KitDataModule } from '../../../../../../ngx-kit-ui/src/public-api';
import { NgIconComponent } from "@ng-icons/core";

@Component({
  selector: 'lib-test',
  standalone: true,
  imports: [KitTextModule, KitButtonModule, KitPanelModule, KitLayoutModule, KitNavigationModule, KitDataModule, NgIconComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {

  categories = [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
    { id: 3, name: 'Category 3' },
    { id: 4, name: 'Category 4' },
    { id: 5, name: 'Category 5' },
  ]
}
