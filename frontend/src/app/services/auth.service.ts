import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.apiUrl;
  header = new HttpHeaders({
    'X-Auth-Token': localStorage.getItem('token')
  });

  constructor(private http: HttpClient, private router: Router) { }

  loggedin() {
    return !!localStorage.getItem('token');
  }

  loginUser(user: User) {
    return this.http.post(this.url + 'auth', user);
  }

  registrarUser(user: User) {
    return this.http.post(this.url + 'register',
      { nombre: user.nombre, apellido: user.apellido, email: user.email, password: user.password });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('Apellido');
    localStorage.removeItem('Nombre');
    localStorage.removeItem('UserId');
    this.router.navigate(['/login']);
    location.reload();
  }

  updateUser(id: string, user: User) {
    return this.http.put(this.url + `user/update/${id}`,
      { nombre: user.nombre, apellido: user.apellido, email: user.email, password: user.password, acerca: user.acerca },
      { headers: this.header });
  }

}
