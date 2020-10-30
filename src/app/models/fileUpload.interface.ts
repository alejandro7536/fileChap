export interface FileUpload {

  nombre: string;
  url: string;
  date: number;
  type: string;
  size: number;
  uid?: string;
  icon: {
    icon: string,
    color: string
  };

}
