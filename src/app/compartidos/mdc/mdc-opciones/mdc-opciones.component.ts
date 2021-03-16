import { Component, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-mdc-opciones',
  templateUrl: './mdc-opciones.component.html',
  styleUrls: ['./mdc-opciones.component.css']
})
export class MdcOpcionesComponent {

  @Output() showMDCForm: EventEmitter<any> = new EventEmitter();
  @Output() showMDCList: EventEmitter<any> = new EventEmitter();

  constructor() { }

  mostrarMDCForm(): void {
    this.showMDCForm.emit(true);
  }

  mostrarMDCList(): void {
    this.showMDCList.emit(true);
  }

}
