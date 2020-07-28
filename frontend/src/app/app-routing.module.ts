import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from './components/perfil/perfil.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
  { path: 'perfil/:id', component: PerfilComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: RegisterComponent },
  { path: 'imagenes', loadChildren: './components/imgs/imgs.module#ImgsModule', canActivate: [AuthGuard] },
  { path: '**', pathMatch: 'full', redirectTo: 'perfil' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
