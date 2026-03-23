import { Component } from '@angular/core';
import { KitLayoutModule, KitButtonModule, KitPanelModule, KitTextModule, KitNavigationModule, KitDataModule, KitOverlaysModule, KitInputModule } from '../../../../../../ngx-kit-ui/src/public-api';
import { KitNavigationService } from '../../../../../../ngx-kit-ui/src/lib/services/navigation/navigation.service';

@Component({
  selector: 'lib-test',
  standalone: true,
  imports: [KitTextModule, KitButtonModule, KitPanelModule, KitLayoutModule, KitNavigationModule, KitDataModule, KitOverlaysModule, KitInputModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {

  options = ['Option 1', 'Option 2', 'Option 3'];

  constructor(private navigationService: KitNavigationService) { }

  onPush() {
    console.log('[TEST1] Current view stack:', this.navigationService.viewStack());
    console.log('[TEST1] Pushing test2 view onto the view stack...');
    this.navigationService.pushView('/test2');
    console.log('[TEST1] Current view stack after push:', this.navigationService.viewStack());
  }

  onPop() {
    console.log('[TEST1] Current view stack before pop:', this.navigationService.viewStack());
    this.navigationService.popView();
    console.log('[TEST1] Current view stack after pop:', this.navigationService.viewStack());
  }
}
