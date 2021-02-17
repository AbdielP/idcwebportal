import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { GeneralService } from 'src/app/services/general.service';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';

/** Constants used to fill up our data base. */
// const COLORS: string[] = [
//   'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
//   'aqua', 'blue', 'navy', 'black', 'gray'
// ];
// const NAMES: string[] = [
//   'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
//   'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
// ];

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.css']
})
export class BitacoraComponent implements OnInit, AfterViewInit  {
  displayedColumns: string[] = ['nombre_visitante', 'check_in_out', 'empleado_visitante'];
  dataSource: MatTableDataSource<any> = null;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  userInfo: any;
  userProyects: any = '';
  proyecto: any = '';
  bitacora: Bitacora[] = [];

  constructor(private generalService: GeneralService, private localstorageService: LocalstorageService) {
     // Create 100 users
    //  const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

     // Assign the data to the data source for the table to render
  }

  ngOnInit() {
    this.getTokenInfo(this.localstorageService.getToken());
  }

  // NO BORRAR ---------------------------------->

  // Obtiene la información del token del usuario logeado
  getTokenInfo(token: string) {
    this.localstorageService.getTokenInfo(token).subscribe((resp: any) => {
      this.userInfo = resp.tokeninfo;
      this.getUsuarioProyectos(this.userInfo.idusuario);
    });
  }

  // Lista los proyectos relacionados con el usuario logeado
  getUsuarioProyectos(idusuario: number): void {
    this.generalService.select('ggggwwwwpppp', `sp_clientes_select_proyectos('${idusuario}')`).subscribe((resp: any) => {
      this.userProyects = resp.select;
      if (this.userProyects.lengt === 1) {
        this.selectBitacoraProyecto(this.userProyects[0]);
      }
    });
  }

  selectBitacoraProyecto(proyecto: any): void {
    this.proyecto = proyecto;
    this.generalService.select('ggggwwwwpppp', `check_in_out.sp_select_bitacora_compania('${proyecto.nombre_empresa}',
    '${proyecto.datacenter}','2021')`).subscribe((resp: any) => { // LLAMAR FECHA SERVICE PARA EL AÑO ACTUAL
      console.log(resp);
      this.bitacora = resp.select;
      this.dataSource = new MatTableDataSource<Bitacora>(this.bitacora);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // HASTA AQUÍ NO BORRAR ----------------------->

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

export class Bitacora {
  constructor(public nombre_visitante: string, public check_in_out: any, public empleado_visitante: string) {}
}

/** Builds and returns a new User. */
// function createNewUser(id: number): any {
//   const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
//       NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

//   return {
//     id: id.toString(),
//     name: name,
//     progress: Math.round(Math.random() * 100).toString(),
//     color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
//   };
// }
