import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  @Input() events: Observable<any>;
  eventSubscription: Subscription;

  displayedColumns: string[] = ['index', 'nombre', 'apellido', 'username', 'cedula', 'createdAt', 'activo', 'idusuario'];
  dataSource: MatTableDataSource<any> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnInit(): void {
    this.subscribeEventUsuarios();
  }

   // tslint:disable-next-line: use-lifecycle-interface
   ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }

  subscribeEventUsuarios(): void {
    this.eventSubscription = this.events.subscribe((usuarios) => {
      console.log(usuarios);
      this.dataSource = new MatTableDataSource<any>(usuarios);
      this.dataSource.paginator = this.paginator;
    });
  }

  editUser(idusuario: number): void {
    console.log(idusuario);
  }

}
