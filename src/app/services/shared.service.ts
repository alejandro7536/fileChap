import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { User } from '../models/user.interface';
import { FileUpload } from '../models/fileUpload.interface';
import { Share } from '../models/share.interface';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private router: Router,
    private toast: ToastrService,
    private db: AngularFirestore,
    private auth: AuthService

  ) { }

  get userid() {
    return this.auth.usuario.uid;
  }

  getUSerByEmail(email) {
    return this.db.collection<User>('user', ref => ref.where('email', '==', email)).valueChanges();
  }

  ifExist(filename: string, userToName: string) {
    return this.db.collection(`sharedwith/${this.auth.usuario.uid}/shared`, ref => ref.where('nombre', '==', filename).where('sharedWithName', '==', userToName)).valueChanges();
  }

  saveSharedWith(userTo: User, file: FileUpload ) {
    const share: Share = {
      ...file,
      ownerName: this.auth.usuario.name,
      sharedWithName: userTo.name,
      sharedWithUid: userTo.googleId
    };

    this.db.collection(`sharedwith/${this.auth.usuario.uid}/shared`).add(share).then(docRef => {
      docRef.update({
        'uid': docRef.id // Agreaga el uid al documento
      });
      this.saveSheredMe(userTo.googleId, docRef.id, share).then(() => {
        this.toast.success(`${share.nombre} compartido con ${userTo.name}`, 'Completado', {
          closeButton: true,
          progressBar: true,
          positionClass: 'toast-bottom-right'
        });
      });
    });
  }

  saveSheredMe(sharedWithUid: string, shareUid: string, share: Share) {
    return this.db.collection(`sharedme/${sharedWithUid}/shared`).doc(shareUid).set({
      ...share
    });
  }


  getSharedMeFiles() {
    return this.db.collection(`sharedme/${this.userid}/shared`, ref => ref.orderBy('date', 'desc')).valueChanges();
  }

  getSharedWithFiles() {
    return this.db.collection(`sharedwith/${this.userid}/shared`, ref => ref.orderBy('date', 'desc')).valueChanges();
  }

  deleteShared(shared: Share) {
    this.db.collection(`sharedwith/${this.userid}/shared`).doc(shared.uid).delete().then(() => {
      this.db.collection(`sharedme/${shared.sharedWithUid}/shared`).doc(shared.uid).delete().then(() => {
        this.toast.success(`Dejaste de compartir ${shared.nombre} a ${shared.sharedWithName}`, 'Completado', {
          closeButton: true,
          progressBar: true,
          positionClass: 'toast-bottom-right'
        });
      });
    }).catch(error => {
      this.toast.error(`No se pudo dejar de compartir ${shared.nombre}`, 'Error', {
        closeButton: true,
        progressBar: true,
        positionClass: 'toast-bottom-right'
      });
    });
  }
}
