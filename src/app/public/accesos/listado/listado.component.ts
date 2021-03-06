import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { GeneralService } from 'src/app/services/general.service';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { SeguridadService } from 'src/app/services/seguridad.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  accesos: any = null;
  userInfo: any;
  userProyects: any = '';
  valoropciones = 'aprobados'; // Decide cual stored procedure llamar para listar los accesos, solicitados o en trámite.
  proyecto: any = '';
  showSpinner = false;

  eventSubscription: Subscription;
  @Input() opciones: Observable<any>;
  @Output() emitirDetalleAcceso: EventEmitter<any> = new EventEmitter();

  constructor(private localstorageService: LocalstorageService, private generalService: GeneralService,
              private seguridadService: SeguridadService) { }

  ngOnInit() {
    this.localStorageGetAccesos();
    this.getUsuarioProyectos();
    this.subscribeEventOpciones();
  }

  onClickDetalleAcceso(idseguridad: number): void {
    this.emitirDetalleAcceso.emit(idseguridad);
  }

  // Lista los proyectos relacionados con el usuario logeado
  getUsuarioProyectos(): void {
    this.generalService.select(`api/cwpidc/general/proyectos?token=${this.localstorageService.getToken()}`)
    .subscribe((resp: any) => {
      this.userProyects = resp.select;
      if (this.userProyects.length === 1) {
        this.selectAccesosProyecto(this.userProyects[0]);
      }
    });
  }

  // LLama los accesos del proyecto indicado
  selectAccesosProyecto(proyecto: any): void {
    this.showSpinner = true;
    this.proyecto = proyecto;
    this.localstorageService.setAcceso(this.proyecto);
    let url = '';
    if (this.valoropciones === 'aprobados') {
      url = `api/cwpidc/accesos/aprobados/${proyecto.nombre_empresa}/${proyecto.datacenter}`;
    } else {
      url = `api/cwpidc/accesos/pendientes/${proyecto.nombre_empresa}/${this.proyecto.datacenter}`;
    }
    this.seguridadService.select(url).subscribe((resp: any) => {
      this.accesos = resp.select;
      this.showSpinner = false;
    });
  }

  subscribeEventOpciones(): void {
    this.eventSubscription = this.opciones.subscribe(({opciones}) => {
      // console.log(opciones);
      if (opciones === 'tramite') {
        this.valoropciones = 'tramite';
        this.selectAccesos(`api/cwpidc/accesos/pendientes/${this.proyecto.nombre_empresa}/${this.proyecto.datacenter}`);
      } else {
        this.valoropciones = 'aprobados';
        this.selectAccesos(`api/cwpidc/accesos/aprobados/${this.proyecto.nombre_empresa}/${this.proyecto.datacenter}`);
      }
    });
  }

  // Llama al servicio para obtener listado de acesos
  selectAccesos(url: string): void {
    this.showSpinner = true;
    this.seguridadService.select(url).subscribe((resp: any) => {
        this.accesos = resp.select;
        this.showSpinner = false;
      });
  }

  // Si existe un acceso seleccionado en localstorage, lo lee y lo coloca en html.
  localStorageGetAccesos(): void {
    if (this.localstorageService.getProyecto() != null) {
      this.proyecto = JSON.parse(this.localstorageService.getProyecto());
      this.selectAccesos(`sp_select_accesos_compania('${this.proyecto.nombre_empresa}', '${this.proyecto.datacenter}')`);
    }
  }

}
