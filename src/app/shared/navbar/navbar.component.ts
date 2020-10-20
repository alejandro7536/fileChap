import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.interface';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { CargaImagenesService } from '../../services/carga-imagenes.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(
    public auth: AuthService,
    private router: Router,
    public images: CargaImagenesService
  ) { }

  ngOnInit(): void {

  }

  logout() {
    this.auth.logout();
    localStorage.clear();
    this.auth.usuario = new UserModel('','');
    this.router.navigateByUrl('/login');
  }

}
