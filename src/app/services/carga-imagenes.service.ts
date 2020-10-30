import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { FileItem } from '../models/file-item.model';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';
import { FileUpload } from '../models/fileUpload.interface';

@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {

  public buscarTerm = '';
  public subiendo = false; // bloquear botones mientras se esta subiendo

  constructor(
    private db: AngularFirestore,
    private toastr: ToastrService,
    private auth: AuthService

  ) { }

  get userid() {
    return this.auth.usuario.uid;
  }

  cargarFirebase(files: FileItem[]) {
    console.log(files);
    this.subiendo = true;
    const storageRef = firebase.storage().ref();

    for (const item of files) {

      if (item.progreso >= 100) {
        this.toastr.info(`${item.nombreArchivo} ya ha sido cargada`, 'Ups', {
          closeButton: true,
          progressBar: true,
          positionClass: 'toast-bottom-right'
        });
        continue;
      }


      if (item.archivo.fileType.startsWith('image')) {
        this.cargarImagen(storageRef, item);

      } else {

        this.cargarArchivo(storageRef, item);

      }
    }

  }

  private guardarImagen(imagen: { nombre: string, url: string, date: number }) {

    return this.db.collection(`data/${this.userid}/images`).add(imagen);
  }

  private guardarArchivo(file: FileUpload) {

    return this.db.collection(`data/${this.userid}/files`).add(file);
  }

  getImagenes() {
    return this.db.collection(`data/${this.userid}/images`, ref => ref.orderBy('date', 'desc')).valueChanges();
  }

  getArchivos() {
    return this.db.collection(`data/${this.userid}/files`, ref => ref.orderBy('date', 'desc')).valueChanges();
  }

  eliminar(uid: string, tipo?: string) {
    if (tipo === 'image') {
      return this.db.collection(`data/${this.userid}/images`).doc(uid).delete();
    } else {
      return this.db.collection(`data/${this.userid}/files`).doc(uid).delete();
    }
  }


  cargarImagen(storageRef, item: FileItem): void {

    item.estaSubiendo = true;

    const uploadTask: firebase.storage.UploadTask = storageRef.child(`${this.userid}/img/${item.nombreArchivo}`)
      .put(item.archivo.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      // tslint:disable-next-line: no-shadowed-variable
      (snapshotChanges: firebase.storage.UploadTaskSnapshot) =>
        item.progreso = (snapshotChanges.bytesTransferred / snapshotChanges.totalBytes) * 100,
      (error) => console.error('Error al subir ', error),
      async () => {

        console.log('Imagen cargada correctamente');
        this.toastr.success(`${item.nombreArchivo} cargada correctamente`, 'Completado', {
          closeButton: true,
          progressBar: true,
          positionClass: 'toast-bottom-right'
        });

        await uploadTask.snapshot.ref.getDownloadURL().then(url => item.url = url);

        item.estaSubiendo = false;
        this.guardarImagen({
          nombre: item.nombreArchivo,
          url: item.url,
          date: new Date().getTime()
        }).then(docRef => {
          this.subiendo = false;
          docRef.update({
            'uid': docRef.id
          });
        });
      }
    );

  }


  cargarArchivo(storageRef, item: FileItem): void {

    item.estaSubiendo = true;

    const uploadTask: firebase.storage.UploadTask = storageRef.child(`${this.userid}/files/${item.nombreArchivo}`)
      .put(item.archivo.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      // tslint:disable-next-line: no-shadowed-variable
      (snapshotChanges: firebase.storage.UploadTaskSnapshot) =>
        item.progreso = (snapshotChanges.bytesTransferred / snapshotChanges.totalBytes) * 100,
      (error) => console.error('Error al subir ', error),
      async () => {

        console.log('Archivo cargado correctamente');
        this.toastr.success(`${item.nombreArchivo} cargado correctamente`, 'Completado', {
          closeButton: true,
          progressBar: true,
          positionClass: 'toast-bottom-right'
        });

        await uploadTask.snapshot.ref.getDownloadURL().then(url => item.url = url);

        item.estaSubiendo = false;
        this.guardarArchivo({
          nombre: item.nombreArchivo,
          url: item.url,
          date: new Date().getTime(),
          type: item.archivo.fileType,
          size: item.archivo.fileSize,
          icon: this.asignarColorIcon(item.archivo.fileType)
        }).then(docRef => {
          this.subiendo = false;
          docRef.update({
            'uid': docRef.id
          });
        });
      }
    );

  }


  asignarColorIcon(type: string) {

    const pdf = {icon: 'fa-file-pdf', color: 'red-600'};
    const doc = {icon: 'fa-file-word', color: 'blue-600'};
    const xls = {icon: 'fa-file-excel', color: 'green-600'};
    const ppt = {icon: 'fa-file-powerpoint', color: 'orange-600'};
    const comp = {icon: 'fa-file-archive', color: 'teal-600'};
    const video = {icon: 'fa-file-video', color: 'yellow-600'};
    const audio = {icon: 'fa-file-audio', color: 'pink-600'};
    const csv = {icon: 'fa-file-csv', color: 'green-600'};
    const apk = {icon: 'fa-gamepad', color: 'green-600'};
    const code = {icon: 'fa-file-code', color: 'red-600'};
    const file = {icon: 'fa-file', color: 'gray-600'};

    if (type.startsWith('video')) {
      return video;
    }

    if (type.startsWith('audio')) {
      return audio;
    }

    switch (type) {
      case 'application/pdf':
        return pdf;

      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return doc;

      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        return xls;

      case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        return ppt;

      case 'application/x-zip-compressed':
        return comp;

      case 'application/vnd.ms-excel':
        return csv;

      case 'application/vnd.android.package-archive':
        return apk;

      case 'text/css':
        return code;

      case 'text/html':
        return code;

      case 'text/js':
        return code;

      default:
        return file;
    }


  }


}
