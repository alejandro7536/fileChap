import { Component, Input, OnInit } from '@angular/core';
import { FileUpload } from '../../models/fileUpload.interface';
import { CargaImagenesService } from '../../services/carga-imagenes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-files-grid',
  templateUrl: './files-grid.component.html',
  styleUrls: ['./files-grid.component.css']
})
export class FilesGridComponent implements OnInit {

  @Input() archivos: FileUpload[] = [];


  constructor(
    public cargaImagenesService: CargaImagenesService

  ) { }

  ngOnInit(): void {
  }

  borrar(file: FileUpload) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Se eliminará ${file.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5362aa',
      cancelButtonColor: '#4b5568',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cargaImagenesService.eliminar(file.uid);
        Swal.fire(
          'Eliminado!',
          ` ${file.nombre} se eliminó`,
          'success'
        );
      }
    });
  }

}


