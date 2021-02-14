import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ErrorhandlerService {

  SwalParameters: any = {
    icon: 'error',
    title: 'Oops...',
    text: '',
    footer: '',
    backdrop: `rgba(0,0,0,0.4)`
  };

  constructor() { }

  errorHandler(error: any): Promise<any> {
    console.log(error);
    if (error.status === 0) {
      return Swal.fire('Server Down.', `Servidor fuera de servicio.`, 'question');
    }
    // Forbidden -> El cliente no posee los permisos necesarios para cierto contenido
    if (error.status === 403) {
      this.SwalParameters.text = `${error.error.message}`;
      this.SwalParameters.footer = `${error.error.footerMessage}`;
      return Swal.fire(this.SwalParameters);
    }
    // Se podría definir cuando usar 'error' o 'question' según el tipo de error? probablemente desde el backend?
    return Swal.fire('Error', `${error.error.message}`, 'error');
  }
}
