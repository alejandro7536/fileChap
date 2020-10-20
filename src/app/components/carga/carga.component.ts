import { Component, OnInit, ViewChild } from '@angular/core';
import * as FilePond from 'filepond';
import { ToastrService } from 'ngx-toastr';
import { FileItem } from '../../models/file-item.model';
import { CargaImagenesService } from '../../services/carga-imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.css']
})
export class CargaComponent implements OnInit {

  @ViewChild('myPond') myPond: any;

  estaSobreElemento = false;

  archivos: FileItem[] = [];

  constructor(
    public cargaImagenesService: CargaImagenesService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

  }

  pondOptions = {
    class: 'my-filepond',
    multiple: true,
    labelIdle: 'Arrastra tus imágenes aquí',
    acceptedFileTypes: 'image/jpeg, image/png'
  }


  pondHandleInit() {
    // console.log('FilePond has initialised', this.myPond);
  }

  pondHandleAddFile(event: any) {
    const fileitem: FileItem = new FileItem(event.file);

    if (!fileitem.archivo.fileType.startsWith('image')){
      this.toastr.error('El formato del archivo no es válido', 'Error', {
        closeButton: true,
        progressBar: true,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    this.archivos.push(fileitem);

  }

  cargarImagenes() {
    this.cargaImagenesService.cargarImagenesFirebase(this.archivos);
  }

  vaciar() {
    this.archivos = [];
  }

  remove(i: number) {
    this.archivos.splice(i, 1);
  }

  pondRemove(event: any) {
    for (let index = 0; index < this.archivos.length; index++) {
      if (this.archivos[index].archivo.filename === event.file.filename) {
        this.archivos.splice(index, 1);
      }
    }
  }

}
