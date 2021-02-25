import { DateService } from 'src/app/services/date.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { GeneralService } from 'src/app/services/general.service';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';

import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.css']
})
export class BitacoraComponent implements OnInit  {
  displayedColumns: string[] = ['index', 'nombre_visitante', 'cedula_visitante', 'check_in_out', 'empleado_visitante',
  // 'compania_visitante', 'idc', 'check_out', 'estado'];
  'check_out', 'duracion', 'estado'];
  dataSource: MatTableDataSource<any> = null;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  userInfo: any;
  userProyects: any = '';
  proyecto: any = '';
  bitacora: any[] = [];

  nombreproyecto = '';
  nombreidc = '';

  constructor(private generalService: GeneralService, private localstorageService: LocalstorageService,
              private dateService: DateService) {}

  ngOnInit() {
    this.getTokenInfo(this.localstorageService.getToken());
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
    this.generalService.select('ggggwwwwpppp', `sp_clientes_select_proyectos('${idusuario}')`).subscribe((resp: any) => {
      this.userProyects = resp.select;
      // CUANDO EL CLIENTE TIENE 1 SOLO PROYECTO
      if (this.userProyects.length === 1) {
        this.selectBitacoraProyecto(this.userProyects[0]);
        this.nombreproyecto = this.userProyects[0].nombre_empresa;
        this.nombreidc = this.userProyects[0].datacenter;
      }
    });
  }

  selectBitacoraProyecto(proyecto: any): void {
    this.proyecto = proyecto;
    // console.log(this.proyecto);
    this.nombreproyecto = proyecto.nombre_empresa;
    this.nombreidc = proyecto.datacenter;
    this.generalService.select('ggggwwwwpppp', `check_in_out.sp_select_bitacora_compania('${proyecto.nombre_empresa}',
    '${proyecto.datacenter}','${this.dateService.actualYear()}')`).subscribe((resp: any) => {
      this.bitacora = resp.select;
      this.dataSource = new MatTableDataSource<any>(this.bitacora);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
