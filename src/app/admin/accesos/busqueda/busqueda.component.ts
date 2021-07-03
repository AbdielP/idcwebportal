import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  proyectos = [];
  @ViewChild('test') test: ElementRef;
  @Output() emitirProyecto: EventEmitter<any> = new EventEmitter();

  constructor(private generalService: GeneralService) { }

  ngOnInit() {
    this.selectProyectos();
  }

  // Llamada al servicio REST para consultar el listado de proyectos/clientes disponible.
  selectProyectos(): void {
      this.generalService.select('api/cwpidc/general/all/proyectos').subscribe((resp: any) => {
      this.proyectos = resp.select;
    });
  }

  // Evento que captura el proyecto/cliente seleccionado de la lista <select>
  onChangeProyecto(event): void {
    this.emitirProyecto.emit(event.target.value);
  }

}
