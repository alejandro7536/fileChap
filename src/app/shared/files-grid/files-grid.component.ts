import { Component, Input, OnInit } from '@angular/core';
import { FileUpload } from '../../models/fileUpload.interface';
import { CargaImagenesService } from '../../services/carga-imagenes.service';
import Swal from 'sweetalert2';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-files-grid',
  templateUrl: './files-grid.component.html',
  styleUrls: ['./files-grid.component.css']
})
export class FilesGridComponent implements OnInit {

  @Input() archivos: FileUpload[] = [];
  public comp = false;
  public compFile: FileUpload;


  constructor(
    public cargaImagenesService: CargaImagenesService,

  ) { }

  ngOnInit(): void {
  }

  verVideo(video: FileUpload){
    Swal.fire({
      html:  `
      <h1 class="text-sm text-left mb-2">${video.nombre}</h1>
      <div class="items-center">
      <video
      id="my-video"
      class="video-js vjs-theme-city w-full h-auto rounded-lg shadow-lg"
      controls
      preload="auto"
      data-setup="{
        autoplay: true,
        controls: true
      }"
    >
      <source src="${video.url}" type="${video.type}" />
      <p class="vjs-no-js">
        To view this video please enable JavaScript, and consider upgrading to a
        web browser that
        <a href="https://videojs.com/html5-video-support/" target="_blank"
          >supports HTML5 video</a
        >
      </p>
    </video>
    </div>`
           ,
       showConfirmButton: false,
       showCloseButton: true,
       allowOutsideClick: false,
       customClass: {
         container: 'margin:0 ; padding: 0;'
       }
    });
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
        this.cargaImagenesService.eliminar(file);
      }
    });
  }

  compartir(file: FileUpload) {
    this.compFile = file;
    this.comp = true;
  }

  cancelar() {
    this.compFile = null;
    this.comp = false;
  }


}


