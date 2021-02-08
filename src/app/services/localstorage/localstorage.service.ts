import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() {
    this.clearLocalstorageCategory();
  }

  // Guarda en localstorage el acceso seleccionado en el listado <select> del componente app-listado
  setAcceso(proyecto): void {
    delete proyecto.idproyecto;
    delete proyecto.jaula;
    delete proyecto.loc;
    delete proyecto.nivel;
    delete proyecto.rack;
    delete proyecto.tipo;
    localStorage.setItem('accesos', JSON.stringify(proyecto));
  }

  getProyecto(): any {
    return localStorage.getItem('accesos');
  }

  clearLocalstorageCategory(): void {
    localStorage.removeItem('accesos');
  }
}
