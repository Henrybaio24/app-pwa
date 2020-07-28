import { Component, OnInit, Input } from '@angular/core';
import { Image } from '../../models/image';
import { ImagenesService } from '../../services/imagenes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-imgs',
  templateUrl: './imgs.component.html',
  styles: []
})
export class ImgsComponent implements OnInit {

  @Input() images: Image[];

  constructor(private imagenes: ImagenesService, private router: Router) { }

  ngOnInit() {
  }

  deleteImagen(id: string) {
    if (confirm('Estas seguro de que quieres eliminar')) {
      return this.imagenes.deleteImagen(id).subscribe(res => {
        this.images = this.images.filter(image => image._id !== res._id);
      });

    }
  }
  editImagen(id: string) {
    this.router.navigate(['/imagenes/editar', id]);
  }

}
