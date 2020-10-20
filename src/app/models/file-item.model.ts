export class FileItem {

  public archivo: any;
  public nombreArchivo: string;
  public url: string;
  public estaSubiendo: boolean;
  public progreso: number;

  constructor(
    archivo: any
  ) {
    this.archivo = archivo;
    this.nombreArchivo = this.archivo.filename;
    this.estaSubiendo = false;
    this.progreso = 0;
  }
}
