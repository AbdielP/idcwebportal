import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string;
  SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient) {
    this.loadSession();
  }

  loadSession(): void {
    if (localStorage.getItem('sti')) {
      this.token = localStorage.getItem('sti');
    } else {
      this.token = '';
    }
  }
  // Función para realizar login
  login(form: NgForm, storedprocedure: string): Observable<any> {
    return this.http.post(`${this.SERVER_URL}/auth/login/${storedprocedure}`, form.value)
    .pipe(map((resp: any) => {
      // this.setStorage(resp.token);
      return resp;
    }))
    .pipe(catchError(err => of([
      // this.authErrorService.handleError(err)
      console.log(err)
    ])));
  }

  isLogedIn(): boolean {
    return (this.token.length > 5) ? true : false;
  }
}
