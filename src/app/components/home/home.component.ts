import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Imagen } from '../../models/imagen.interface';
import { CargaImagenesService } from '../../services/carga-imagenes.service';
import { FileUpload } from '../../models/fileUpload.interface';
import { combineLatest } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public imagenes: Imagen[] = [];
  public archivos: FileUpload[] = [];
  public loading = false;

  constructor(
    public cargaImagenesService: CargaImagenesService,
  ) { }

  ngOnInit() {
    this.loading = true;

    combineLatest([
      this.cargaImagenesService.getImagenes().pipe(take(10)),
      this.cargaImagenesService.getArchivos().pipe(take(10))
    ]).subscribe(([images, files]: [Imagen[], FileUpload[]]) => {
      this.loading = false;
      this.imagenes = images;
      this.archivos = files;
    });
  }

}
