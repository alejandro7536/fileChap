import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscarNombre'
})
export class BuscarNombrePipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const buscarPorNombre = [];
    for ( const imagen of value) {
      if (imagen.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        buscarPorNombre.push(imagen);
      }
    }
    return buscarPorNombre;
  }

}
