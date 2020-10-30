import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { auth } from 'firebase/app';
import { User } from '../models/user.interface';
import { UserModel } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userData$: Observable<firebase.User>;
  usuario: UserModel = new UserModel('', '');


  constructor(
    private authfire: AngularFireAuth,
    private router: Router

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

    this.authfire.signInWithPopup(new auth.GoogleAuthProvider()).then(() => this.router.navigateByUrl('files/home'));

  }

  logout() {
    this.authfire.signOut();
  }
}
