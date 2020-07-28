import { Component, OnInit } from '@angular/core';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { Image } from '../../models/image';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  user: User = {
    _id: '',
    nombre: '',
    apellido: '',
    password: '',
    email: '',
    acerca: '',
  };

  userModif: User = {
    _id: '',
    nombre: '',
    apellido: '',
    password: '',
    email: '',
    acerca: '',
  };

  image: Image[] = [];

  fotoSelecionada: ArrayBuffer | String;

  idUserAuth;

  error = false;
  success = false;
  loading = true;

  constructor(private imagenes: ImagenesService,
    private auth: AuthService, private activatedRouter: ActivatedRoute, private router: Router) {
    activatedRouter.params.subscribe(params => {
      if (params['id']) {
        imagenes.getUser(params['id']).subscribe((res: User) => {
          this.user = res;
          console.log(res);
        });
      } else {
        imagenes.getThisUser().subscribe((res: User) => {
          this.user = res;
          this.userModif = res;
          console.log(res);
         });
      }
    });

   }

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
      this.idUserAuth = localStorage.getItem('UserId');
    }, 1000);
  }

  updateUser() {
    this.auth.updateUser(this.user._id, this.userModif).subscribe(res => {
      console.log(res['user'].name);
      localStorage.setItem('Nombre', res['user'].nombre);
      localStorage.setItem('Apellido', res['user'].apellido);
      localStorage.setItem('Acerca', res['user'].acerca);
    });
   }
}
