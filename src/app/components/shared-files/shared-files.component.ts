import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { FileUpload } from '../../models/fileUpload.interface';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-shared-files',
  templateUrl: './shared-files.component.html',
  styleUrls: ['./shared-files.component.css']
})
export class SharedFilesComponent implements OnInit {

  public sharedWith = false;
  public sharedMe = true;
  public sharedWithFiles: FileUpload[] = [];
  public sharedMeFiles: FileUpload[] = [];
  public loading = false;



  constructor(
    private sharedSrvice: SharedService
  ) { }

  ngOnInit(): void {
    combineLatest([
      this.sharedSrvice.getSharedMeFiles(),
      this.sharedSrvice.getSharedWithFiles()
    ]).subscribe(([sharedMe, sharedWith]: [FileUpload[], FileUpload[]]) => {
      this.sharedMeFiles = sharedMe;
      this.sharedWithFiles = sharedWith;
      this.loading = false;
    });

  }

  tab1() {
    this.sharedMe = true;
    this.sharedWith = false;
  }

  tab2() {
    this.sharedMe = false;
    this.sharedWith = true;
  }

}
