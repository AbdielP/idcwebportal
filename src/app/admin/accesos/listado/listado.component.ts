import { Subscription, Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  eventSubscription: Subscription;
  @Input() events: Observable<any>;

  constructor() { }

  ngOnInit() {
    this.subscribeEventIdProyecto();
  }

  subscribeEventIdProyecto(): void {
    this.eventSubscription = this.events.subscribe(({idproyecto}) => {
      console.log(idproyecto);
      // Llamar aquí al servicio para listar los accesos.
    });
  }

}
