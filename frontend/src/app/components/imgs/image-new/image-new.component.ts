import { Component, OnInit } from '@angular/core';
import { Image } from '../../../models/image';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-image-new',
  templateUrl: './image-new.component.html',
  styles: []
})
export class ImageNewComponent implements OnInit {

  image: Image = {
    _id: '',
    nombre: '',
    descripcion: '',
    userId: '',
    ruta: '',
    imagen: null,
  };

  imagesf: Image[] = [];

  fotoSelecionada: ArrayBuffer | String;

  loading = true;

  constructor(private imagenes: ImagenesService, private router: Router, private activatedRoute: ActivatedRoute) {
    imagenes.getAllImagenes().subscribe((res: Image[]) => {
      this.imagesf.push(...res);
      console.log(this.imagesf);
      this.loading = false;
    });
  }

  ngOnInit() {
  }

  onChange(event) {
    console.log(event);
    if (event.target.files && event.target.files[0]) {
      this.image.imagen = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.fotoSelecionada = reader.result;
      reader.readAsDataURL(this.image.imagen);
    }
  }

  subirImagen() {
    this.imagenes.subirImagen(this.image).subscribe((res: Image) => {
      console.log(res);
      this.imagesf.push(res);
      this.limpiarForm();
    });
  }

  limpiarForm() {
    this.image = {
      _id: '',
      nombre: '',
      descripcion: '',
      userId: '',
      ruta: '',
      imagen: null,
    };
  }

}
