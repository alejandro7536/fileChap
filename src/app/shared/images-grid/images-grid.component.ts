import { Component, Input, OnInit } from '@angular/core';
import { Imagen } from '../../models/imagen.interface';
import { CargaImagenesService } from '../../services/carga-imagenes.service';
import Swal from 'sweetalert2';
import { FileUpload } from '../../models/fileUpload.interface';

@Component({
  selector: 'app-images-grid',
  templateUrl: './images-grid.component.html',
  styleUrls: ['./images-grid.component.css']
})
export class ImagesGridComponent implements OnInit {

  @Input() imagenes: Imagen[] = [];

  public comp = false;
  public compFile: FileUpload;


  constructor(
    public cargaImagenesService: CargaImagenesService,
  ) { }

  ngOnInit(): void {
  }


  borrar(imagen: Imagen) {

    Swal.fire({
      title: '¿Estás seguro?',
      text: `Se eliminará ${imagen.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5362aa',
      cancelButtonColor: '#4b5568',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cargaImagenesService.eliminar(imagen, 'image');
      }
    });
  }

  compartir(file: FileUpload) {
    this.compFile = {
      ...file,
      type: 'image',
      icon: {
        icon: 'fa-file-image',
        color: 'red-400'
      }
    };
    this.comp = true;
  }

  cancelar() {
    this.compFile = null;
    this.comp = false;
  }


}
