import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accesos',
  templateUrl: './accesos.component.html',
  styleUrls: ['./accesos.component.css']
})
export class AccesosComponent implements OnInit {
  eventSubject: Subject<any> = new Subject<any>();

  constructor() { }

  ngOnInit() {}

  // Recibe el proyecto emitido desde el componmente hijo: app-busqueda cuando se usa el <select> para buscar accesos
  getProyecto(proyecto): void {
    // Emite el proyecto recibido hacia el componente hijo: app-listado
    this.eventSubject.next({proyecto});
  }

  // Recibe opciones para mostrar (Accesos aprobados o en trámite) desde el componente hijo: app-opciones
  getOpciones(opciones): void {
    console.log(opciones);
  }
}
