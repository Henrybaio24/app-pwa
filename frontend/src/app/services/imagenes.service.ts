import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Image } from '../models/image';
import { map } from 'rxjs/operators';
import { OnlineOfflineService } from './online-offline.service';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  url = environment.apiUrl;
  private auth = true;
  private db: Dexie;
  private table: Dexie.Table<Image, any> = null;
  header = new HttpHeaders({
    'X-Auth-Token': localStorage.getItem('token')
  });

  constructor(private http: HttpClient,
    private onlineOfflineService: OnlineOfflineService) {
    this.conexionEstado();
    this.iniciarIndexedDb();
  }

  private iniciarIndexedDb() {
    this.db = new Dexie('db-images');
    this.db.version(2).stores({
      image: '_id, value'
    });
    this.table = this.db.table('image');
  }

  // tslint:disable-next-line:no-shadowed-variable
  private async salvarIndexedDb(Image: Image) {
    try {
      await this.table.add(Image);
      const todosImages: Image[] = await this.table.toArray();
      console.log('Image', todosImages);
    } catch (error) {
      console.log('Error', error);
    }

  }

  private async enviarInfor() {
    const todosImages: Image[] = await this.table.toArray();
    for (const image of todosImages) {
      this.subirImagen(image);
      await this.table.delete(image._id);
      console.log(`Image con id ${image._id}`);
    }
  }


  actualizarAuth(auth: boolean) {
    this.auth = auth;
  }

  getAllImagenes() {
    return this.http.get(this.url + `images`, { headers: this.header });
  }

  getImagen(id: string) {
    return this.http.get(this.url + `image/${id}`, { headers: this.header });
  }


  // tslint:disable-next-line:no-shadowed-variable
  subirImagen(Image: Image) {
    if (this.onlineOfflineService.isOnline) {
      const formData = new FormData();
      formData.append('nombre', Image.nombre);
      formData.append('descripcion', Image.descripcion);
      formData.append('imagen', Image.imagen);
      return this.http.post(this.url + 'images/create', formData, { headers: this.header })
        .pipe(map(res => {
          return res['image'];
        }));
    } else {
      this.salvarIndexedDb(Image);
    }

  }


  deleteImagen(id: string) {
    return this.http.delete(this.url + `images/delete/${id}`, { headers: this.header })
      .pipe(map(res => {
        return res['image'];
      }));
  }

  updateImagen(id: string, image: Image) {
    return this.http.put(this.url + `images/edit/${id}`, image, { headers: this.header });
  }

  getUser(id: string) {
    return this.http.get(this.url + `user/${id}`, { headers: this.header });
  }

  getThisUser() {
    return this.http.get(this.url + 'user', { headers: this.header });
  }

  private conexionEstado() {
    this.onlineOfflineService.statusConnection
      .subscribe(online => {
        if (online) {
          this.enviarInfor();
        } else {
          console.log('offline');
        }
      });
  }
}
