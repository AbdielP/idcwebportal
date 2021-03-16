import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';

@Component({
  selector: 'app-mdc-list',
  providers: [DatePipe],
  templateUrl: './mdc-list.component.html',
  styleUrls: ['./mdc-list.component.css']
})
export class MdcListComponent implements OnInit {

  proyecto: any = [];
  nombreEmpresa = '';
  usuarios: any;
  versionesMatriz = '';

  userroll: number;
  proyectos: any;
  eventSubject: Subject<any> = new Subject<any>();

  constructor(private generalService: GeneralService, private localstorageService: LocalstorageService , public datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getUserRoll();
  }

  // Obtiene del localstorage el roll del usuario logeado
  getUserRoll() {
    this.userroll = this.localstorageService.getUserRoll();
    if (this.userroll === 2) {
      this.selectProyectos();
    }
  }

  // Recibe el proyecto emitido desde el componmente hijo: app-proyectos cuando se usa el <select>
  getProyecto(proyecto): void {
    this.proyecto = JSON.parse(proyecto);
    this.nombreEmpresa = this.proyecto.nombre_empresa;
    this.getVersiones(this.proyecto.idproyecto);
    this.getListadoMDC(this.proyecto.idproyecto);
  }

  // Obtiene los proyectos del cliente
  selectProyectos(): void {
    this.generalService.selectWithToken('ggggwwwwpppptoken', 'sp_clientes_select_proyectos', this.localstorageService.getToken())
    .subscribe((resp: any) => {
      this.proyectos = resp.select;
    });
  }

  // Obtiene las versiones de MDC del proyecto del usuario
  getVersiones(idproyecto: any) {
    this.generalService.select('ppppccccc', `select_versiones_matrices(${idproyecto})`).subscribe((resp: any) => {
      // console.log(resp.select);
      this.versionesMatriz = resp.select;
    });
  }

  // Obtiene LA versión seleccionada de MDC
  getVersion(event: any) {
    // console.log(this.datePipe.transform(event.target.value, 'yyyy-MM-dd'));
    const fecha = this.datePipe.transform(event.target.value, 'yyyy-MM-dd');
    this.generalService.select('ppppccccc', `sp_select_mdc_proyecto_version(${this.proyecto.idproyecto},'${fecha}')`)
    .subscribe((resp: any) => {
      this.usuarios = resp.select;
    });
  }

  // Obtiene el listado de personal de la MDC más reciente del usuario logeado
  getListadoMDC(idproyecto: number) {
    this.generalService.select('ppppccccc', `sp_select_mdc_proyecto(${idproyecto})`).subscribe((resp: any) => {
      // console.log(resp);
      this.usuarios = resp.select;
    });
  }

  // Obtiene el IDPROYECTO del select cuando usuario es cliente
  onChangeProyecto(event: any) {
    this.proyecto = JSON.parse(event.target.value);
    this.nombreEmpresa = this.proyecto.nombre_empresa;
    this.getVersiones(this.proyecto.idproyecto);
    this.getListadoMDC(this.proyecto.idproyecto);
  }

  redirect(link: string) {
    window.open(link, '_blank');
  }

}
