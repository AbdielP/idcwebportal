import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  accesos = [];
  userInfo: any;
  userProyects: any;

  constructor(private localStorageService: LocalstorageService, private generalService: GeneralService) { }

  ngOnInit() {
    this.getTokenInfo(this.localStorageService.getToken());
  }

  onClickDetalleAcceso(idseguridad): void {
  }

  getTokenInfo(token: string) {
    this.localStorageService.getTokenInfo(token).subscribe((resp: any) => {
      console.log(resp.tokeninfo);
      this.userInfo = resp.tokeninfo;
      this.getUsuarioProyectos(this.userInfo.idusuario);
    });
  }

  getUsuarioProyectos(idusuario: number): void {
    this.generalService.select(`sp_clientes_select_proyectos('${idusuario}')`).subscribe((resp: any) => {
      // console.log(resp);
      this.userProyects = resp.select;
      console.log(this.userProyects);
      /*
         - Hacer un menú de algún tipo para seleccionar que proyecto listar sus accesos.
          - Al hacer click al proyecto, listar.
          - Si tiene 1 solo proyecto, listar directamente.
      */
    });
  }

}
