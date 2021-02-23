import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
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

  update(url: string, form: any, token: any): Observable<any> {
    return this.http.post(`${this.SERVER_URL}/${url}?token=${token}`, form)
    .pipe((catchError(err => [
      console.log(err)
    ])));
  }
}
