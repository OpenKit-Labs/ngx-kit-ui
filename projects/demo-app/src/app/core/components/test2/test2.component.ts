import { Component } from '@angular/core';
import { KitLayoutModule, KitButtonModule, KitPanelModule, KitTextModule, KitNavigationModule, KitDataModule, KitOverlaysModule, KitInputModule } from '../../../../../../ngx-kit-ui/src/public-api';
import { KitNavigationService } from '../../../../../../ngx-kit-ui/src/lib/services/navigation/navigation.service';

@Component({
    selector: 'lib-test2',
    standalone: true,
    imports: [KitTextModule, KitButtonModule, KitPanelModule, KitLayoutModule, KitNavigationModule, KitDataModule, KitOverlaysModule, KitInputModule],
    templateUrl: './test2.component.html',
    styleUrl: './test2.component.scss'
})
export class Test2Component {


    constructor(private navigationService: KitNavigationService) { }

    onPop() {
        console.log('[TEST2] Current view stack before pop:', this.navigationService.viewStack());
        this.navigationService.popView();
        console.log('[TEST2] Current view stack after pop:', this.navigationService.viewStack());
    }
}
