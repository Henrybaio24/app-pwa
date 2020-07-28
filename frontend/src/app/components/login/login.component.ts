import { Component, OnInit, HostListener } from '@angular/core';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = {
    _id: '',
    nombre: '',
    apellido: '',
    email: '',
    acerca: '',
    password: '',
  };

  errorPassword = false;
  mensajeError = '';

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.auth.loginUser(this.user).subscribe(res => {
      console.log(res);
      localStorage.setItem('token', res['token']);
      localStorage.setItem('Nombre', res['user'].nombre);
      localStorage.setItem('Apellido', res['user'].apellido);
      localStorage.setItem('UserId', res['user']._id);
      this.router.navigate(['perfil']);
    }, err => {
      if (err.error.message === 'password incorrecta') {
        this.errorPassword = true;
        this.mensajeError = 'password incorrecto.';
      } else if (err.error.message === 'usuario no encontrado') {
        this.errorPassword = true;
        this.mensajeError = 'El email que colocó no se encuentra registrado.';
      }
    });
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === '8' || event.code === '8') {
      event.preventDefault();
      this.login();
    }
  }

}
