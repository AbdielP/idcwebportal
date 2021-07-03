import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  private SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient) { }

  // Preguntas de seguridad
  select(url: string): Observable<any> {
    return this.http.get(`${this.SERVER_URL}/${url}`)
      .pipe((catchError(err => [
        console.log(err)
    ])));
  }

  insert(url: string, form: any): Observable<any> {
    return this.http.post(`${this.SERVER_URL}/${url}`, form);
    // .pipe((catchError(err => [
    //   console.log(err)
    // ])));
  }
}
