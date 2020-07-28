import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImgsRoutingModule } from './imgs-routing.module';
import { ImgsComponent } from './imgs.component';
import { ImageEditComponent } from './image-edit/image-edit.component';
import { ImageNewComponent } from './image-new/image-new.component';

@NgModule({
  declarations: [ImageEditComponent, ImageNewComponent, ImgsComponent],
  imports: [CommonModule, ImgsRoutingModule, FormsModule, ReactiveFormsModule],
})

export class ImgsModule { }
