import { Component, OnInit, HostListener } from '@angular/core';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = {
    _id: '',
    nombre: '',
    apellido: '',
    email: '',
    acerca: '',
    password: '',
  };

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  registrarUser() {
    this.auth.registrarUser(this.user).subscribe(res => {
      localStorage.setItem('token', res['token']);
      localStorage.setItem('Nombre', res['user'].nombre);
      localStorage.setItem('Apellido', res['user'].apellido);
      localStorage.setItem('UserId', res['user']._id);
      this.router.navigate(['perfil']);
    });
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === '+' || event.code === '+') {
      event.preventDefault();
      this.registrarUser();
    }
  }

}
