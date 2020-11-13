import { Component, OnDestroy, OnInit } from '@angular/core';
import { CargaImagenesService } from '../../services/carga-imagenes.service';
import { Imagen } from '../../models/imagen.interface';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.css']
})
export class FotosComponent implements OnInit, OnDestroy {

  public imagenes: Imagen[] = [];
  public loading = false;


  constructor(
    public cargaImagenesService: CargaImagenesService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnDestroy(): void {
    this.cargaImagenesService.buscarTerm = '';
  }

  ngOnInit(): void {
    this.loading = true;
    this.cargaImagenesService.getImagenes().subscribe((images: Imagen[]) => {
      this.imagenes = images;

      if(images.length === 0) {
        this.router.navigateByUrl('home');
      }

      this.loading = false;
    });

  }

}
