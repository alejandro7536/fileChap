import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './auth/login/login.component';
import { FilesRoutingModule } from './components/components.routing';
import { TerminosComponent } from './auth/terminos/terminos.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'terms/:uid', component: TerminosComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'files/home'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' }), FilesRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
