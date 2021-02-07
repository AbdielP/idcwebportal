import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  proyectos = [];

  constructor(private generalService: GeneralService) { }

  ngOnInit() {
    this.selectProyectos();
  }

  selectProyectos(): void {
    this.generalService.select('sp_select_proyectos()').subscribe((resp: any) => {
      this.proyectos = resp.select;
    });
  }

}
