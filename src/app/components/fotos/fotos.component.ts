import { Component, OnInit } from '@angular/core';
import { CargaImagenesService } from '../../services/carga-imagenes.service';
import { Imagen } from '../../models/imagen.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.css']
})
export class FotosComponent implements OnInit {

  public imagenes: Imagen[] = [];
  public loading = false;


  constructor(
    public cargaImagenesService: CargaImagenesService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.cargaImagenesService.getImagenes().subscribe((images: Imagen[]) => {
      this.imagenes = images;
      this.loading = false;
    });

  }

}
