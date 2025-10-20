import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KitLayoutModule, KitTextModule } from '../../../../../../ngx-kit-ui/src/public-api';
import { CodeBlockComponent } from '../../../shared/code-block/code-block.component';

@Component({
  selector: 'app-navigating',
  standalone: true,
  imports: [RouterModule, KitLayoutModule, KitTextModule, CodeBlockComponent],
  templateUrl: './navigating.component.html',
  styleUrls: ['./navigating.component.scss']
})
export class NavigatingComponent {
  navigationServiceCode = `import { KitNavigationService } from ' @openkit-labs/ngx-kit-ui';

@Component({
  selector: 'app-example',
  template: \`
    <button (click)="goBack()">Go Back</button>
    <button (click)="goForward()">Go Forward</button>
    <button (click)="goToSettings()">Go to Settings</button>
  \`
})
export class ExampleComponent {
  constructor(private navigationService: KitNavigationService) {}

  goBack() {
    this.navigationService.navigateBack();
  }

  goForward() {
    this.navigationService.navigateForward();
  }

  goToSettings() {
    this.navigationService.navigateTo('/settings');
  }
}
`;

  viewStackCode = `import { Component, effect } from '@angular/core';
import { KitNavigationService } from ' @openkit-labs/ngx-kit-ui';

@Component({
  selector: 'app-example',
  template: \`
    <button (click)="goToFormPage1()">Go to Form Page 1</button>
    <button (click)="goToFormPage2()">Go to Form Page 2</button>
    <button (click)="clearStack()">Clear View Stack</button>
    <div *ngIf="stackLength > 0">
      <p>View stack contains {{ stackLength }} item(s).</p>
      <button (click)="popView()">Pop Last View</button>
    </div>
  \`
})
export class ExampleComponent {
  stackLength = 0;

  constructor(private navigationService: KitNavigationService) {
    effect(() => {
      const stack = this.navigationService.viewStack();
      this.stackLength = stack.length;
    });
  }

  goToFormPage1() {
    this.navigationService.pushView('/form-page-1');
  }

  goToFormPage2() {
    this.navigationService.pushView('/form-page-2');
  }

  popView() {
    this.navigationService.popView();
  }

  clearStack() {
    this.navigationService.clearViewStack();
  }
}
`;
}