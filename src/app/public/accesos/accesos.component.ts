import { Subject } from 'rxjs';
import { Component } from '@angular/core';

@Component({
  selector: 'app-accesos',
  templateUrl: './accesos.component.html',
  styleUrls: ['./accesos.component.css']
})
export class AccesosComponent {

  eventDetalleAcceso: Subject<any> = new Subject<any>();
  eventOpciones: Subject<any> = new Subject<any>();

  esconderDetalle = true;
  esconderBusqueda = false;

  constructor() { }

  // Recibe opciones para mostrar (Accesos aprobados o en trámite) desde el componente hijo: app-opciones
  getOpciones(opciones): void {
    this.esconderDetalle = true;
    if (opciones === 'tramite') {
      this.esconderBusqueda = true;
    } else {
      this.esconderBusqueda = false;
    }
    // Emite las opciones de accesos aprobados o en trámite hacia el componente hijo app-listado
    this.eventOpciones.next({opciones});
  }

  // Recibe la información del acceso (ID) a mostrar (Detalles)
  getDetallesAcceso(detalle): void {
    this.esconderDetalle = false;
    // Emite el ID del acceso hacia el componente compartido: app-detalle
    this.eventDetalleAcceso.next({detalle});
  }

}
