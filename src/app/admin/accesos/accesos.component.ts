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
  esconderBusqueda = false;

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
    // Emite las opciones de accesos aprobados o en trámite hacia el componente hijo app-listado
    if (opciones === 'tramite') {
      this.esconderBusqueda = true;
    } else {
      this.esconderBusqueda = false;
    }
    this.eventOpciones.next({opciones});
  }
}
