import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsComponent } from './components.component';
import { FotosComponent } from './fotos/fotos.component';
import { CargaComponent } from './carga/carga.component';
import { AuthGuard } from '../guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { ArchivosComponent } from './archivos/archivos.component';
import { SharedFilesComponent } from './shared-files/shared-files.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'files', component: ComponentsComponent,
        canActivate: [AuthGuard],
        children: [
          { path: 'home', component: HomeComponent},
          { path: 'fotos', component: FotosComponent},
          { path: 'files', component: ArchivosComponent},
          { path: 'cargar', component: CargaComponent},
          { path: 'shared', component: SharedFilesComponent},
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class FilesRoutingModule {

}
