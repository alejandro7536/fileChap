import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FotosComponent } from './components/fotos/fotos.component';
import { CargaComponent } from './components/carga/carga.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'fotos', component: FotosComponent, canActivate: [AuthGuard] },
  { path: 'cargar', component: CargaComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'fotos'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
