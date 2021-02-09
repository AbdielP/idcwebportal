import { Observable, Subscription } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { SeguridadService } from 'src/app/services/seguridad.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  acceso = [];
  eventSubscription: Subscription;
  @Input() events: Observable<any>;

  constructor(private seguridadService: SeguridadService) { }

  ngOnInit() {
    this.subscribeEventDetalleAcceso();
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }

  subscribeEventDetalleAcceso(): void {
    this.eventSubscription = this.events.subscribe(({detalle}) => {
      this.seguridadService.select(`sp_select_accesos_detalle('${detalle}')`).subscribe((resp: any) => {
        console.log(resp);
        this.acceso = resp.select[0];
      });
    });
  }

}
