import { Component, Input, OnInit } from '@angular/core';
import { FileUpload } from '../../models/fileUpload.interface';
import Swal from 'sweetalert2';
import { CargaImagenesService } from '../../services/carga-imagenes.service';
import { SharedService } from '../../services/shared.service';
import { Share } from '../../models/share.interface';

@Component({
  selector: 'app-shared-files-grid',
  templateUrl: './shared-files-grid.component.html',
  styleUrls: ['./shared-files-grid.component.css']
})
export class SharedFilesGridComponent implements OnInit {


  @Input() archivos: FileUpload[] = [];
  @Input() canRemove: boolean;

  constructor(
    public cargaImagenesService: CargaImagenesService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
  }

  borrar(file: Share) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Dejaras de compartir ${file.nombre} a ${file.sharedWithName}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5362aa',
      cancelButtonColor: '#4b5568',
      confirmButtonText: 'Dejar de compartir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sharedService.deleteShared(file);
        // Swal.fire(
        //   'Eliminado!',
        //   ` ${file.nombre} se eliminó`,
        //   'success'
        // );
      }
    });
  }

}
