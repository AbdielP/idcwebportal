import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AutherrorService {

  SwalParameters: any = {
    icon: 'error',
    title: 'Oops...',
    text: '',
    footer: '',
    backdrop: `rgba(0,0,0,0.4)`
  };

  constructor() { }

  errorHandler(error: any) {
    // Error servidor backend fuera de servicio.
    if (error.status === 0) {
      console.log(error);
      return Swal.fire('Server Down.', `Servidor de inicio de sesión fuera de servicio.`, 'question');
    }
    // Error servidor (500)
    if (error.status === 500) {
      console.log(error);
      return Swal.fire('Error', `${error.error.message}`, 'question');
    }

    // Default
    console.log(error);
    this.SwalParameters.text = `${error.error.message}`;
    this.SwalParameters.footer = `${error.error.footerMessage}`;
    return Swal.fire(this.SwalParameters);
  }
}
