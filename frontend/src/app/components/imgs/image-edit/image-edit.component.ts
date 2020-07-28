import { Component, OnInit } from '@angular/core';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { Image } from '../../../models/image';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-image-edit',
  templateUrl: './image-edit.component.html',
  styles: []
})
export class ImageEditComponent implements OnInit {

  images: Image[] = [];
  image: Image = {
    _id: '',
    nombre: '',
    descripcion: '',
    userId: '',
    ruta: '',
    imagen: null,

  };
  id: string;

  constructor(private imagenes: ImagenesService, private activatedRouter: ActivatedRoute, private router: Router) {
    activatedRouter.params.subscribe(params => {
      this.id = params['id'];
     imagenes.getImagen(this.id).subscribe((res: Image) => {
      this.image = res;
     });
    });

    imagenes.getAllImagenes().subscribe((res: Image[]) => {
      this.images.push(...res);
    });
   }

  ngOnInit() {
  }

  actualizarImagen() {
    this.imagenes.updateImagen(this.id, this.image).subscribe(res => {
      console.log(res);
      this.router.navigate(['/imagenes']);
    });

  }

}
