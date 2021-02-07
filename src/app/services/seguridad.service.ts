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

  select(storedprocedure: string): Observable<any> {
    return this.http.get(`${this.SERVER_URL}/sssswwwwpppp/${storedprocedure}`)
    .pipe((catchError(err => [
      console.log(err)
    ])));
  }
}
