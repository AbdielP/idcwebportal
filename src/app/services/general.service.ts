import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ErrorhandlerService } from 'src/app/services/error/errorhandler.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient, private errorHandler: ErrorhandlerService) { }

  select(url: string): Observable<any> {
    return this.http.get(`${this.SERVER_URL}/${url}`)
    .pipe((catchError(err => [
      console.log(err)
    ])));
  }
  // BORRAR!!! -> No usar este, pasar token por URL al 'select'
  selectWithToken(url: string, sp: any, token: string): Observable<any> {
    return this.http.get(`${this.SERVER_URL}/${url}?token=${token}`)
    .pipe((catchError(err => [
      console.log(err)
    ])));
  }

  insertNewUser(form: any): Observable<any> {
    return this.http.post(`${this.SERVER_URL}/api/cwpidc/portal/newuser`, form)
    .pipe((catchError(err => [
      this.errorHandler.errorHandler(err)
    ])));
  }

  // USAR SOLO PARA CAMBIAR PRIMERA PASSWORD
  update(url: string, form: any, token: any): Observable<any> {
    return this.http.post(`${this.SERVER_URL}/${url}?token=${token}`, form)
    .pipe(map((resp: any) => {
      return resp;
    }));
    // }), catchError(err => [
    //   console.log(err.error.errors)
    //   Mostrar estos errores en 'snackbars' de angualar material
    // ]));
  }
}
