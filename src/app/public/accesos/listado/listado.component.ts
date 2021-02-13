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

  accesos = [];
  userInfo: any;
  userProyects: any = '';
  valoropciones = 'aprobados'; // Decide cual stored procedure llamar para listar los accesos, solicitados o en trámite.

  eventSubscription: Subscription;
  @Input() opciones: Observable<any>;
  @Output() emitirDetalleAcceso: EventEmitter<any> = new EventEmitter();

  constructor(private localStorageService: LocalstorageService, private generalService: GeneralService,
              private seguridadService: SeguridadService) { }

  ngOnInit() {
    this.getTokenInfo(this.localStorageService.getToken());
    this.subscribeEventOpciones();
  }

  onClickDetalleAcceso(idseguridad: number): void {
    this.emitirDetalleAcceso.emit(idseguridad);
  }

  // Obtiene la información del token del usuario logeado
  getTokenInfo(token: string) {
    this.localStorageService.getTokenInfo(token).subscribe((resp: any) => {
      this.userInfo = resp.tokeninfo;
      this.getUsuarioProyectos(this.userInfo.idusuario);
    });
  }

  // Lista los proyectos relacionados con el usuario logeado
  getUsuarioProyectos(idusuario: number): void {
    this.generalService.select(`sp_clientes_select_proyectos('${idusuario}')`).subscribe((resp: any) => {
      // console.log(resp);
      this.userProyects = resp.select;
      if (this.userProyects.lengt === 1) {
        this.selectAccesosProyecto(this.userProyects[0].compania_visitante, this.userProyects[0].datacenter);
      }
    });
  }

  // LLama los accesos del proyecto indicado
  selectAccesosProyecto(companiavisitante: string, datacenter: string): void {
    let sp = '';
    if (this.valoropciones === 'aprobados') {
      sp = `sp_select_accesos_compania('${companiavisitante}', '${datacenter}')`;
    } else {
      sp = `sp_clientes_accesos_pendientes_aprobacion('${companiavisitante}',
      '${datacenter}')`;
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
        this.selectAccesos(`sp_clientes_accesos_pendientes_aprobacion('${this.userProyects.nombre_empresa}',
         '${this.userProyects.datacenter}')`);
      } else {
        this.valoropciones = 'aprobados';
        this.selectAccesos(`sp_select_accesos_compania('${this.userProyects.nombre_empresa}', '${this.userProyects.datacenter}')`);
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

}
