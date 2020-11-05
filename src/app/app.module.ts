import { BrowserModule } from '@angular/platform-browser';
import { NgModule, PipeTransform } from '@angular/core';


import { AppComponent } from './app.component';
import { FotosComponent } from './components/fotos/fotos.component';
import { CargaComponent } from './components/carga/carga.component';
import { AppRoutingModule } from './app.routes';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';


import { environment } from '../environments/environment';

// import filepond module
import { FilePondModule, registerPlugin } from 'ngx-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageEdit from 'filepond-plugin-image-edit';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

// import and register filepond file type validation plugin
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import { NgDropFilesDirective } from './directives/ng-drop-files.directive';
import { LoginComponent } from './auth/login/login.component';
import { BuscarNombrePipe } from './pipes/buscar-nombre.pipe';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { ArchivosComponent } from './components/archivos/archivos.component';
import { ComponentsComponent } from './components/components.component';
import { FilesRoutingModule } from './components/components.routing';
import { SharedModule } from './shared/shared.module';
import { SharedFilesComponent } from './components/shared-files/shared-files.component';
registerPlugin(FilePondPluginFileValidateType);
registerPlugin(FilePondPluginImagePreview);
registerPlugin(FilePondPluginImageEdit);

@NgModule({
  declarations: [
    AppComponent,
    FotosComponent,
    CargaComponent,
    NgDropFilesDirective,
    LoginComponent,
    HomeComponent,
    ArchivosComponent,
    ComponentsComponent,
    SharedFilesComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FilesRoutingModule,
    FormsModule,
    FilePondModule, // add filepond module here
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,

    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
