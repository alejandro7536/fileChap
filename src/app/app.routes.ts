import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './auth/login/login.component';
import { FilesRoutingModule } from './components/components.routing';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'files/home'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true}), FilesRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
