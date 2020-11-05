import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SlideImegesComponent } from './slide-imeges/slide-imeges.component';
import { SlideFilesComponent } from './slide-files/slide-files.component';
import { FilesGridComponent } from './files-grid/files-grid.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ImagesGridComponent } from './images-grid/images-grid.component';
import { FooterComponent } from './footer/footer.component';
import { LoaderComponent } from './loader/loader.component';
import { BuscarNombrePipe } from '../pipes/buscar-nombre.pipe';
import { AppRoutingModule } from '../app.routes';
import { ShareComponent } from './share/share.component';
import { SharedFilesGridComponent } from './shared-files-grid/shared-files-grid.component';

@NgModule({
  declarations: [
    SlideImegesComponent,
    SlideFilesComponent,
    FilesGridComponent,
    NavbarComponent,
    ImagesGridComponent,
    FooterComponent,
    LoaderComponent,
    BuscarNombrePipe,
    ShareComponent,
    SharedFilesGridComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  exports: [
    SlideImegesComponent,
    SlideFilesComponent,
    FilesGridComponent,
    NavbarComponent,
    ImagesGridComponent,
    FooterComponent,
    LoaderComponent,
    BuscarNombrePipe,
    ShareComponent,
    SharedFilesGridComponent
  ],

})
export class SharedModule { }
