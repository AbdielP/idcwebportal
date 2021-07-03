import { SeguridadService } from 'src/app/services/seguridad.service';
import { Subscription, Observable } from 'rxjs';
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  accesos = [];
  proyecto: any = [];
  mnsgtramite = true;
  showSpinner = false;

  eventSubscription: Subscription;
  @Input() events: Observable<any>;
  @Input() opciones: Observable<any>;

  @Output() emitirDetalleAcceso: EventEmitter<any> = new EventEmitter();

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
      this.selectAccesos(`api/cwpidc/accesos/aprobados/${this.proyecto.nombre_empresa}/${this.proyecto.datacenter}`);
      // this.selectAccesos(`sp_select_accesos_compania('${this.proyecto.nombre_empresa}', '${this.proyecto.datacenter}')`);
    });
  }

  subscribeEventOpciones(): void {
    this.eventSubscription = this.opciones.subscribe(({opciones}) => {
      // console.log(opciones);
      this.showSpinner = true;
      this.mnsgtramite = true;
      if (opciones === 'tramite') {
        this.mnsgtramite = false;
        this.selectAccesos(`api/cwpidc/accesos/pendientes`);
      } else {
        this.selectAccesos(`api/cwpidc/accesos/aprobados/${this.proyecto.nombre_empresa}/${this.proyecto.datacenter}`);
        // this.selectAccesos(`sp_select_accesos_compania('${this.proyecto.nombre_empresa}', '${this.proyecto.datacenter}')`);
      }
    });
  }

  // Llama al servicio para obtener listado de acesos
  selectAccesos(url: string): void {
    this.showSpinner = true;
    this.seguridadService.select(url).subscribe((resp: any) => {
        // console.log(resp);
        this.accesos = resp.select;
        this.showSpinner = false;
      });
  }

  // Si existe un acceso seleccionado en localstorage, lo lee y lo coloca en html.
  localStorageGetAccesos(): void {
    if (this.localstorageService.getProyecto() != null) {
      this.proyecto = JSON.parse(this.localstorageService.getProyecto());
      this.selectAccesos(`api/cwpidc/accesos/aprobados/${this.proyecto.nombre_empresa}/${this.proyecto.datacenter}`);
    }
  }

  onClickDetalleAcceso(detalle): void {
    this.emitirDetalleAcceso.emit(detalle);
  }

}
