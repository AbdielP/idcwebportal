import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrcodeComponent } from './accesos/qrcode/qrcode.component';
import { DetalleComponent } from './accesos/detalle/detalle.component';
import { OpcionesComponent } from './accesos/opciones/opciones.component';
import { MdcformComponent } from './mdc/mdcform/mdcform.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [QrcodeComponent, DetalleComponent, OpcionesComponent, MdcformComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ], exports: [QrcodeComponent, DetalleComponent, OpcionesComponent, MdcformComponent]
})
export class CompartidosModule { }
