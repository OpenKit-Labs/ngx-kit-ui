import { NgModule } from '@angular/core';
import { KitImageComponent } from './image/image.component';
import { KitAvatarComponent } from './avatar/avatar.component';

@NgModule({
    imports: [
        KitImageComponent,
        KitAvatarComponent
    ],
    exports: [
        KitImageComponent,
        KitAvatarComponent
    ]
})
export class KitMediaModule { }
