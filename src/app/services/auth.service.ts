import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { auth } from 'firebase/app';
import { User } from '../models/user.interface';
import { UserModel } from '../models/user.model';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';
import { async } from '@angular/core/testing';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userData$: Observable<firebase.User>;
  usuario: UserModel = new UserModel('', '');


  constructor(
    private authfire: AngularFireAuth,
    private router: Router,
    private toast: ToastrService,
    private db: AngularFirestore


  ) {
    this.userData$ = authfire.authState;
    this.authfire.authState.subscribe(user => {

      if (user) {
        this.usuario.name = user.displayName;
        this.usuario.email = user.email;
        this.usuario.photo = user.photoURL;
        this.usuario.uid = user.uid;

      } else {
        console.log('sin usuario');

      }
    });
  }

  login() {

    this.authfire.signInWithPopup(new auth.GoogleAuthProvider())
      .then(async (user: any) => {

        let usuario: any;
        await this.searchUser(user.user.uid).subscribe(userfire => {
          usuario = userfire;
          console.log(usuario);

          if (!usuario) {
            this.saveUser(user.user);
          } else {

            if (!usuario.terms) {
              this.router.navigate(['terms', usuario.googleId]);
            } else {

              this.router.navigateByUrl('files/home');
            }
          }
        });
      })
      .catch(error => {
        this.toast.warning('Cuenta no valida', 'Ups', {
          closeButton: true,
          progressBar: true,
          positionClass: 'toast-bottom-right'
        });
      });

  }

  logout() {
    this.authfire.signOut();
  }

  searchUser(uid) {
    return this.db.collection('user').doc(uid).valueChanges();
  }

  saveUser(user) {
    return this.db.collection('user').doc(user.uid).set({
      date: new Date().getTime(),
      name: user.displayName,
      email: user.email,
      terms: false,
      photo: user.photoURL,
      googleId: user.uid
    }).then(() => {
      this.router.navigate(['terms', user.uid]);
    });
  }
}
