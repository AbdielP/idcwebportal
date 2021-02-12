import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.css']
})
export class OpcionesComponent {

  @Output() emitirOpciones: EventEmitter<any> = new EventEmitter();

  constructor() { }

  aprobados(): void {
    this.emitirOpciones.emit('aprobados');
  }

  noAprobados(): void {
    this.emitirOpciones.emit('tramite');
  }

}

