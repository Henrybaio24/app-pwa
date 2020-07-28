import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageNewComponent } from './image-new/image-new.component';
import { ImageEditComponent } from './image-edit/image-edit.component';

const routes: Routes = [
    {
        path: '',
        component: ImageNewComponent,
    },
    {
        path: 'editar/:id',
        component: ImageEditComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ImgsRoutingModule { }
