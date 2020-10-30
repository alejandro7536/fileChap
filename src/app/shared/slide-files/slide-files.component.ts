import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import Swiper from 'swiper/bundle';

import { FileUpload } from '../../models/fileUpload.interface';

@Component({
  selector: 'app-slide-files',
  templateUrl: './slide-files.component.html',
  styleUrls: ['./slide-files.component.css']
})
export class SlideFilesComponent implements AfterViewInit {

  @Input() archivos: FileUpload[] = [];
  ancho: number;
  elementos: number;


  constructor() {
    this.calcularElementos();
  }

  calcularElementos() {
    this.ancho = document.body.clientWidth;

    if (this.ancho < 400) {
      this.elementos = 1.2;
      return;
    }

    if (this.ancho < 900) {
      this.elementos = 2.2;
      return;
    }

    if (this.ancho < 1200) {
      this.elementos = 3.5;
      return;

    }else {
      this.elementos = 4;
      return;
    }
  }

  ngAfterViewInit() {

    let options;

    if (this.archivos.length < 5) {
      options = {
        slidesPerView: this.elementos,
        spaceBetween: 15,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        }
      };

    } else {

      options = {
        loop: true,
        autoplay: true,
        slidesPerView: this.elementos,
        spaceBetween: 15,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        }
      };

    }

    const mySwiper = new Swiper('.swiper-container', options);

  }

}
