import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accesos',
  templateUrl: './accesos.component.html',
  styleUrls: ['./accesos.component.css']
})
export class AccesosComponent implements OnInit {

  accesos = [];
  eventSubject: Subject<any> = new Subject<any>();

  constructor() { }

  ngOnInit() {
  }

  // Recibe el idproyecto emitido desde el componmente hijo: app-busqueda cuando se usa el <select> para buscar accesos
  getProyecto(idproyecto): void {
    // Emite el idproyecto recibido hacia el componente hijo: app-listado
    this.eventSubject.next({idproyecto});
  }
}
