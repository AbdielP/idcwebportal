import { Subject } from 'rxjs';
import { Component, OnInit, HostListener } from '@angular/core';
import { SessionInactivityService } from 'src/app/services/session/session-inactivity.service';

@Component({
  selector: 'app-accesos',
  templateUrl: './accesos.component.html',
  styleUrls: ['./accesos.component.css']
})
export class AccesosComponent implements OnInit {

  userActivity: any;
  userInactive: Subject<any> = new Subject();
  eventSubject: Subject<any> = new Subject<any>();
  eventOpciones: Subject<any> = new Subject<any>();
  eventDetalleAcceso: Subject<any> = new Subject<any>();

  // Esconder componentes
  esconderBusqueda = false;
  esconderDetalle = true;

  constructor(private sessionInactivity: SessionInactivityService) { }

  ngOnInit() {}

  @HostListener('window:mousemove') refreshUserState() {
    this.sessionInactivity.resetActivity();
  }

  // Recibe el proyecto emitido desde el componmente hijo: app-busqueda cuando se usa el <select> para buscar accesos
  getProyecto(proyecto): void {
    // Emite el proyecto recibido hacia el componente hijo: app-listado
    this.eventSubject.next({proyecto});
  }

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
    // Emite el ID del acceso hacia el componente hijo app-detalle
    this.eventDetalleAcceso.next({detalle});
  }
}
