import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-terminos',
  templateUrl: './terminos.component.html',
  styleUrls: ['./terminos.component.css']
})
export class TerminosComponent implements OnInit {

  terms = false;
  userId = '';

  constructor(
    private ar: ActivatedRoute,
    private toast: ToastrService,
    private auth: AuthService
  ) {
    this.ar.params.subscribe(params => {
      this.userId = params.uid;
    });

  }

  ngOnInit(): void {
  }

  aceptarTerminos() {
    if (!this.terms) {
      this.toast.info('Debes aceptar los términos y condiciones', 'Info', {
        closeButton: true,
        progressBar: true,
        positionClass: 'toast-bottom-right'
      });
    } else {
      this.auth.acepTerms(this.userId);
    }

  }

}
