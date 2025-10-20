import { NgModule } from '@angular/core';
import { KitImageComponent } from './image/image.component';
import { KitImageLoadingDirective } from './image/image-loading.directive';
import { KitImageErrorDirective } from './image/image-error.directive';
import { KitAvatarComponent } from './avatar/avatar.component';

@NgModule({
    imports: [
        KitImageComponent,
        KitImageLoadingDirective,
        KitImageErrorDirective,
        KitAvatarComponent
    ],
    exports: [
        KitImageComponent,
        KitImageLoadingDirective,
        KitImageErrorDirective,
        KitAvatarComponent
    ]
})
export class KitMediaModule { }
