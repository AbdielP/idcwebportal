import { Router } from '@angular/router';
import { Usuario } from 'src/app/classes/usuario.class';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string;
  SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient, private router: Router) {
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
  login(usuario: Usuario, storedprocedure: string): Observable<any> {
    return this.http.post(`${this.SERVER_URL}/auth/login/${storedprocedure}`, usuario)
    .pipe(map((resp: any) => {
      this.setStorage(resp);
      return resp;
    }));
  }

  setStorage(resp: any) {
    localStorage.setItem('sti', resp.token);
    localStorage.setItem('type', resp.usuario.idroll);
    this.token  = resp.token;
  }

  isLogedIn(): boolean {
    return (this.token.length > 5) ? true : false;
  }

  logOut() {
    this.token = '';
    this.clearStorage();
    this.router.navigate(['/auth/login']);
  }

  clearStorage() {
    localStorage.removeItem('sti');
    localStorage.clear();
  }
}
