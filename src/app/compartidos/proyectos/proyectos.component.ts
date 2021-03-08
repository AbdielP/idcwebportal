import { GeneralService } from 'src/app/services/general.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  proyectos = [];
  @Output() emitirProyecto: EventEmitter<any> =  new EventEmitter();

  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
    this.selectProyectos();
  }

  selectProyectos(): void {
    this.generalService.select('ggggwwwwpppp', 'sp_select_proyectos()').subscribe((resp: any) => {
      this.proyectos = resp.select;
    });
  }

  onChangeProyecto(event): void {
    this.emitirProyecto.emit(event.target.value);
  }

}
