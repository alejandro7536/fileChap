import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { FileItem } from '../models/file-item.model';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {

  private CARPETA_IMAGENES = 'img';
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

  cargarImagenesFirebase(imagenes: FileItem[]) {
    console.log(imagenes);
    this.subiendo = true;
    const storageRef = firebase.storage().ref();

    for (const item of imagenes) {

      if (item.progreso >= 100) {
        this.toastr.info(`${item.nombreArchivo} ya ha sido cargada`, 'Ups', {
          closeButton: true,
          progressBar: true,
          positionClass: 'toast-bottom-right'
        });
        continue;
      }

      item.estaSubiendo = true;
      const uploadTask: firebase.storage.UploadTask =  storageRef.child(`${this.userid}/${this.CARPETA_IMAGENES}/${item.nombreArchivo}`)
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

  }

  private guardarImagen(imagen: {nombre: string, url: string, date: number}) {

    return this.db.collection(`img/${this.userid}/images`).add(imagen);
  }

  getImagenes() {
    return this.db.collection(`img/${this.userid}/images`, ref => ref.orderBy('date', 'desc')).valueChanges();
  }

  eliminar(uid: string) {
    return this.db.collection(`img/${this.userid}/images`).doc(uid).delete();
  }


}
