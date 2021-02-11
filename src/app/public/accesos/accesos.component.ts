import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';

@Component({
  selector: 'app-accesos',
  templateUrl: './accesos.component.html',
  styleUrls: ['./accesos.component.css']
})
export class AccesosComponent implements OnInit {

  constructor(private generalService: GeneralService, private localStorageService: LocalstorageService) { }

  ngOnInit() {
    this.getTokenInfo(this.localStorageService.getToken());
  }

  getTokenInfo(token: string) {
    this.generalService.getTokenInfo(token).subscribe((resp: any) => {
      console.log(resp.tokeninfo);
      // Con el IDUSUARIO mandar a llamar el sp_clientes_select_proyectos
      /* Determinar si migrar el llamado a esta función a otro componente.
          - Hacerlo directo desde el listado-component. Hacer un menú de algún tipo para seleccionar que proyecto listar sus accesos.
          - Al hacer click al proyecto, listar.
          - Si tiene 1 solo proyecto, listar directamente.
       */
    });
  }

}
