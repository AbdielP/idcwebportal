import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  accesos = [];

  constructor() { }

  ngOnInit() {
  }

  onClickDetalleAcceso(idseguridad): void {
  }

}
