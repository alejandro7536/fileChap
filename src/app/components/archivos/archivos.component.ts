import { Component, OnDestroy, OnInit } from '@angular/core';
import { FileUpload } from '../../models/fileUpload.interface';
import { CargaImagenesService } from '../../services/carga-imagenes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.css']
})
export class ArchivosComponent implements OnInit, OnDestroy {

  public archivos: FileUpload[] = [];
  public loading = false;



  constructor(
    public cargaImagenesService: CargaImagenesService,
    private router: Router
  ) { }

  ngOnDestroy(): void {
    this.cargaImagenesService.buscarTerm = '';
  }

  ngOnInit(): void {
    this.cargaImagenesService.getArchivos().subscribe((files: FileUpload[]) => {
      this.archivos = files;
      if(files.length === 0) {
        this.router.navigateByUrl('home');
      }
      this.loading = false;
    });
  }

}
