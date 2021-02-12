import { Subject } from 'rxjs';
import { Component } from '@angular/core';

@Component({
  selector: 'app-accesos',
  templateUrl: './accesos.component.html',
  styleUrls: ['./accesos.component.css']
})
export class AccesosComponent {

  eventDetalleAcceso: Subject<any> = new Subject<any>();

  esconderDetalle = true;

  constructor() { }

  // Recibe la información del acceso (ID) a mostrar (Detalles)
  getDetallesAcceso(detalle): void {
    this.esconderDetalle = false;
    // Emite el ID del acceso hacia el componente compartido: app-detalle
    this.eventDetalleAcceso.next({detalle});
  }

}
