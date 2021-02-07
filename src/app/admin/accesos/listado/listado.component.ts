import { SeguridadService } from 'src/app/services/seguridad.service';
import { Subscription, Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  accesos = [];

  eventSubscription: Subscription;
  @Input() events: Observable<any>;

  constructor(private seguridadService: SeguridadService) { }

  ngOnInit() {
    this.subscribeEventIdProyecto();
  }

  subscribeEventIdProyecto(): void {
    this.eventSubscription = this.events.subscribe(({proyecto}) => {
      const proyect = JSON.parse(proyecto);
      this.seguridadService.select(`sp_select_accesos_compania('${proyect.nombre_empresa}', '${proyect.datacenter}')`)
      .subscribe((resp: any) => {
        console.log(resp);
        this.accesos = resp.select;
      });
    });
  }

}
