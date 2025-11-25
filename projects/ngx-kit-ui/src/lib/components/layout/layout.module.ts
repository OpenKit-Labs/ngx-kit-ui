import { NgModule } from '@angular/core';
import { KitPaddingComponent } from './padding/padding.component';
import { KitSpacerComponent } from './spacer/spacer.component';
import { KitRowComponent } from './row/row.component';
import { KitColumnComponent } from './column/column.component';
import { KitExpandedComponent } from './expanded/expanded.component';
import { KitCenterComponent } from './center/center.component';
import { KitSizedBoxComponent } from './sized-box/sized-box.component';
import { KitPageComponent } from './page/page.component';
import { KitAppRootComponent } from './app-root/app-root.component';
import { KitStickyContainerComponent } from './sticky-container/sticky-container.component';
import { KitConstrainedBoxComponent } from './constrained-box/constrained-box.component';
import { KitDividerComponent } from './divider/divider.component';
import { StackComponent } from './stack/stack.component';
import { KitContainerComponent } from './container/container.component';
import { KitBottomBarComponent } from './bottom-bar/bottom-bar.component';
import { KitTopBarComponent } from './top-bar/top-bar.component';
import { KitSideMenuComponent } from './side-menu/side-menu.component';
import { KitGridComponent } from './grid/grid.component';
import { KitCarouselComponent } from './carousel/carousel.component';
@NgModule({
  imports: [
    KitPaddingComponent,
    KitSpacerComponent,
    KitRowComponent,
    KitColumnComponent,
    KitExpandedComponent,
    KitCenterComponent,
    KitSizedBoxComponent,
    KitConstrainedBoxComponent,
    KitPageComponent,
    KitAppRootComponent,
    KitStickyContainerComponent,
    KitDividerComponent,
    StackComponent,
    KitContainerComponent,
    KitBottomBarComponent,
    KitTopBarComponent,
    KitSideMenuComponent,
    KitGridComponent,
    KitCarouselComponent
  ],
  exports: [
    KitPaddingComponent,
    KitSpacerComponent,
    KitRowComponent,
    KitColumnComponent,
    KitExpandedComponent,
    KitConstrainedBoxComponent,
    KitCenterComponent,
    KitSizedBoxComponent,
    KitPageComponent,
    KitAppRootComponent,
    KitStickyContainerComponent,
    KitDividerComponent,
    StackComponent,
    KitContainerComponent,
    KitBottomBarComponent,
    KitTopBarComponent,
    KitSideMenuComponent,
    KitGridComponent,
    KitCarouselComponent
  ]
})
export class KitLayoutModule { }