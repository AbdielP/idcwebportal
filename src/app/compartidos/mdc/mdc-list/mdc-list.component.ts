import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

   // Recibe el proyecto emitido desde el componmente hijo: app-proyectos cuando se usa el <select>
   getProyecto(proyecto): void {
    this.getVersion(JSON.parse(proyecto).idproyecto);
  }

  getVersion(idproyecto: any) {
    console.log(idproyecto);
  }

  redirect(link: string) {}

}
