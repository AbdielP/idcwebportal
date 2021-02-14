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

  eventSubscription: Subscription;
  @Input() opciones: Observable<any>;
  @Output() emitirDetalleAcceso: EventEmitter<any> = new EventEmitter();

  constructor(private localstorageService: LocalstorageService, private generalService: GeneralService,
              private seguridadService: SeguridadService) { }

  ngOnInit() {
    this.localStorageGetAccesos();
    this.getTokenInfo(this.localstorageService.getToken());
    this.subscribeEventOpciones();
    console.log(this.proyecto);
  }

  onClickDetalleAcceso(idseguridad: number): void {
    this.emitirDetalleAcceso.emit(idseguridad);
  }

  // Obtiene la información del token del usuario logeado
  getTokenInfo(token: string) {
    this.localstorageService.getTokenInfo(token).subscribe((resp: any) => {
      this.userInfo = resp.tokeninfo;
      this.getUsuarioProyectos(this.userInfo.idusuario);
    });
  }

  // Lista los proyectos relacionados con el usuario logeado
  getUsuarioProyectos(idusuario: number): void {
    this.generalService.select(`sp_clientes_select_proyectos('${idusuario}')`).subscribe((resp: any) => {
      // console.log(resp);
      this.userProyects = resp.select;
      console.log(this.userProyects);
      if (this.userProyects.lengt === 1) {
        this.selectAccesosProyecto(this.userProyects[0]);
      }
    });
  }

  // LLama los accesos del proyecto indicado
  selectAccesosProyecto(proyecto: any): void {
    this.proyecto = proyecto;
    console.log(this.proyecto);
    this.localstorageService.setAcceso(this.proyecto);
    let sp = '';
    if (this.valoropciones === 'aprobados') {
      sp = `sp_select_accesos_compania('${proyecto.nombre_empresa}', '${proyecto.datacenter}')`;
    } else {
      sp = `sp_clientes_accesos_pendientes_aprobacion('${proyecto.nombre_empresa}',
      '${proyecto.datacenter}')`;
    }
    this.seguridadService.select(sp).subscribe((resp: any) => {
      this.accesos = resp.select;
    });
  }

  subscribeEventOpciones(): void {
    this.eventSubscription = this.opciones.subscribe(({opciones}) => {
      // console.log(opciones);
      if (opciones === 'tramite') {
        this.valoropciones = 'tramite';
        this.selectAccesos(`sp_clientes_accesos_pendientes_aprobacion('${this.proyecto.nombre_empresa}',
         '${this.proyecto.datacenter}')`);
      } else {
        this.valoropciones = 'aprobados';
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

  // Si existe un acceso seleccionado en localstorage, lo lee y lo coloca en html.
  localStorageGetAccesos(): void {
    if (this.localstorageService.getProyecto() != null) {
      this.proyecto = JSON.parse(this.localstorageService.getProyecto());
      this.selectAccesos(`sp_select_accesos_compania('${this.proyecto.nombre_empresa}', '${this.proyecto.datacenter}')`);
    }
  }

}
