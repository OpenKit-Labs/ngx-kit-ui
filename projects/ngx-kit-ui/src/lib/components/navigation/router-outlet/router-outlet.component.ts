import { Component } from '@angular/core';
import { KitNavigationService } from '../../../services/navigation/navigation.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'kit-router-outlet',
  imports: [RouterOutlet],
  templateUrl: './router-outlet.component.html',
  styleUrl: './router-outlet.component.scss',
})
export class KitRouterOutletComponent {

  constructor(private kitNavigationService: KitNavigationService) { }
}
