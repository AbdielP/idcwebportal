import { SeguridadService } from 'src/app/services/seguridad.service';
import { Subscription, Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  accesos = [];
  proyecto: any = [];

  eventSubscription: Subscription;
  @Input() events: Observable<any>;
  @Input() opciones: Observable<any>;

  constructor(private seguridadService: SeguridadService, private localstorageService: LocalstorageService) { }

  ngOnInit() {
    this.localStorageGetAccesos();
    this.subscribeEventProyecto();
    this.subscribeEventOpciones();
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }

  subscribeEventProyecto(): void {
    this.eventSubscription = this.events.subscribe(({proyecto}) => {
      this.proyecto = JSON.parse(proyecto);
      this.localstorageService.setAcceso(this.proyecto);
      this.selectAccesos(`sp_select_accesos_compania('${this.proyecto.nombre_empresa}', '${this.proyecto.datacenter}')`);
    });
  }

  subscribeEventOpciones(): void {
    this.eventSubscription = this.opciones.subscribe(({opciones}) => {
      // console.log(opciones);
      if (opciones === 'tramite') {
        this.selectAccesos(`sp_select_accesos_pendientes_aprobacion()`);
      } else {
        this.selectAccesos(`sp_select_accesos_compania('${this.proyecto.nombre_empresa}', '${this.proyecto.datacenter}')`);
      }
    });
  }

  // Llama al servicio para obtener listado de acesos
  selectAccesos(storedprocedure: string): void {
    this.seguridadService.select(storedprocedure).subscribe((resp: any) => {
        // console.log(resp);
        this.accesos = resp.select;
      });
  }

  localStorageGetAccesos(): void {
    if (this.localstorageService.getProyecto() != null) {
      this.proyecto = JSON.parse(this.localstorageService.getProyecto());
      this.selectAccesos(`sp_select_accesos_compania('${this.proyecto.nombre_empresa}', '${this.proyecto.datacenter}')`);
    }
  }

}
