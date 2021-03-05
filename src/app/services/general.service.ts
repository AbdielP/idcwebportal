import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient) { }

  select(url: string, storedprocedure: string): Observable<any> {
    return this.http.get(`${this.SERVER_URL}/${url}/${storedprocedure}`)
    .pipe((catchError(err => [
      console.log(err)
    ])));
  }
  // es un get que pasa el idusuario en el storedprocedure. requiere token. Se usa para listar proyectos del usuario
  selectWithToken(url: string, storedprocedure: string, token: string): Observable<any> {
    return this.http.get(`${this.SERVER_URL}/${url}/${storedprocedure}?token=${token}`)
    .pipe((catchError(err => [
      console.log(err)
    ])));
  }

  insertNewUser(form: any): Observable<any> {
    return this.http.post(`${this.SERVER_URL}/ppppccccnewuser`, form)
    .pipe((catchError(err => [
      console.log(err)
    ])));
  }

  // CUIDADO: ACTUALIZA EL LOCALSTORAGE, USAR SOLO PARA CAMBIAR PRIMERA PASSWORD
  update(url: string, form: any, token: any): Observable<any> {
    return this.http.post(`${this.SERVER_URL}/${url}?token=${token}`, form)
    .pipe(map((resp: any) => {
      // this.updateStorage(resp.token); Deberia actualizar el storage con el nuevo token (no funciona por los guards)
      return resp;
    }), catchError(err => [
      console.log(err)
    ]));
  }
}
