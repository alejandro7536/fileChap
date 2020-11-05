import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { User } from '../../models/user.interface';
import { ToastrService } from 'ngx-toastr';
import { FileUpload } from '../../models/fileUpload.interface';
import { AuthService } from '../../services/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {

  public userTo: User;
  @Input() file: FileUpload;

  constructor(
    private shared: SharedService,
    private toast: ToastrService,
    private auth: AuthService

  ) { }

  ngOnInit(): void {
  }

  searchUser(email: string) {
    if (email.length === 0 ) {
      return;
    }

    if (email === this.auth.usuario.email) {
      this.toast.info(`No puedes compartirte archivos a ti mismo`, 'Ups', {
        closeButton: true,
        progressBar: true,
        positionClass: 'toast-bottom-right'
      });

    } else {
      this.shared.getUSerByEmail(email).subscribe(user => {
        if (user.length > 0) {
          this.userTo = user[0];

        } else{
          this.toast.info(`No se encontró usuario con ${email}`, 'Info', {
            closeButton: true,
            progressBar: true,
            positionClass: 'toast-bottom-right'
          });
        }
      });
    }

  }

  share() {
    if (this.file && this.userTo ) {
      this.shared.ifExist(this.file.nombre, this.userTo.name).pipe(take(1)).subscribe(
        file => {
          console.log(file);
          if (file.length > 0) {
            this.toast.info(`Ya estas compartiendo este archivo con ${this.userTo.name}`, 'Info', {
              closeButton: true,
              progressBar: true,
              positionClass: 'toast-bottom-right'
            });
            return;
          } else {
            this.shared.saveSharedWith(this.userTo, this.file);
          }
        }
      );

    }
  }

}
