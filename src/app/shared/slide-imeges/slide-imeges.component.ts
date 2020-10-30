import { Component, OnInit, AfterViewInit, Input, AfterContentInit } from '@angular/core';
import Swiper from 'swiper/bundle';
import { Imagen } from '../../models/imagen.interface';


@Component({
  selector: 'app-slide-imeges',
  templateUrl: './slide-imeges.component.html',
  styleUrls: ['./slide-imeges.component.css']
})
export class SlideImegesComponent implements OnInit, AfterViewInit {

  @Input() imagenes: Imagen[] = [];
  ancho: number;
  elementos: number;

  constructor() {
    this.calcularElementos();
  }


  ngOnInit(): void {
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
      this.elementos = 4.5;
      return;
    }
  }

  ngAfterViewInit() {

    let options;

    if (this.imagenes.length < 5) {
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
