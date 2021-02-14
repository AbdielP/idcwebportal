import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  private SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient) {
    this.clearLocalstorageCategory();
  }

  getToken(): string {
    return localStorage.getItem('sti');
  }

  // Guarda en localstorage el acceso seleccionado en el listado <select> del componente app-listado
  setAcceso(proyecto): void {
    delete proyecto.idproyecto;
    delete proyecto.jaula;
    delete proyecto.nivel;
    delete proyecto.rack;
    delete proyecto.tipo;
    delete proyecto.desconectado;
    localStorage.setItem('accesos', JSON.stringify(proyecto));
  }

  getProyecto(): any {
    return localStorage.getItem('accesos');
  }

  clearLocalstorageCategory(): void {
    localStorage.removeItem('accesos');
  }

  // Verificar tokeninfo
  getTokenInfo(token: string): Observable<any> {
    return this.http.get(`${this.SERVER_URL}/stinfo?token=${token}`)
    .pipe((catchError(err => [
      console.log(err)
    ])));
  }
}
