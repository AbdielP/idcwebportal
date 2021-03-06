import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
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

  router: any;

  constructor(private authService: AuthService, private injector: Injector) { }

  errorHandler(error: any): Promise<any> {
    this.router = this.injector.get(Router);
    console.log(error);
    // console.log(error.error.error.code)
    if (error.status === 0) {
      return Swal.fire('Server Down.', `Servidor fuera de servicio.`, 'question');
    }
    if (error.status === 401) {
      this.authService.clearStorage();
      return this.router.navigate(['/auth/login']);
    }
    // Forbidden -> El cliente no posee los permisos necesarios para cierto contenido
    if (error.status === 403) {
      this.SwalParameters.text = `${error.error.message}`;
      this.SwalParameters.footer = `${error.error.footerMessage}`;
      return Swal.fire(this.SwalParameters);
    }

    if (error.error.error.code === 'ER_DUP_ENTRY') {
      this.SwalParameters.text = `${error.error.error.sqlMessage}`;
      this.SwalParameters.footer = `Error, campo duplicado en la base de datos.`;
      return Swal.fire(this.SwalParameters);
    }
    // Se podría definir cuando usar 'error' o 'question' según el tipo de error? probablemente desde el backend?
    // return Swal.fire('Error', `${error.error.message}`, 'error');
  }
}
