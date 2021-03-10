import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-mdc-list',
  templateUrl: './mdc-list.component.html',
  styleUrls: ['./mdc-list.component.css']
})
export class MdcListComponent implements OnInit {

  nombreEmpresa = '';
  usuarios: any;
  versionesMatriz = '';
  eventSubject: Subject<any> = new Subject<any>();

  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
  }

   // Recibe el proyecto emitido desde el componmente hijo: app-proyectos cuando se usa el <select>
   getProyecto(proyecto): void {
    this.nombreEmpresa = JSON.parse(proyecto).nombre_empresa;
    this.getVersion(JSON.parse(proyecto).idproyecto);
    this.getListadoMDC(JSON.parse(proyecto).idproyecto);
  }

  // Obtiene las versiones de MDC del proyecto del usuario
  getVersion(idproyecto: any) {
    console.log(idproyecto);
    this.generalService.select('ppppccccc', `select_versiones_matrices(${idproyecto})`).subscribe((resp: any) => {
      // console.log(resp.select);
      this.versionesMatriz = resp.select;
    });
  }

  // Obtiene el listado de personal de la MDC más reciente del usuario logeado
  getListadoMDC(idproyecto: number) {
    this.generalService.select('ppppccccc', `sp_select_mdc_proyecto(${idproyecto})`).subscribe((resp: any) => {
      // console.log(resp);
      this.usuarios = resp.select;
    });
  }

  redirect(link: string) {}

}
