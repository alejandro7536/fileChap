import { Component, Input, OnInit } from '@angular/core';
import { Imagen } from '../../models/imagen.interface';
import { CargaImagenesService } from '../../services/carga-imagenes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-images-grid',
  templateUrl: './images-grid.component.html',
  styleUrls: ['./images-grid.component.css']
})
export class ImagesGridComponent implements OnInit {

  @Input() imagenes: Imagen[] = [];

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
        Swal.fire(
          'Eliminado!',
          ` ${imagen.nombre} se eliminó`,
          'success'
        );
      }
    });
  }

}
