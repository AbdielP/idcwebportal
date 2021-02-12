import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrcodeComponent } from './accesos/qrcode/qrcode.component';
import { DetalleComponent } from './accesos/detalle/detalle.component';
import { OpcionesComponent } from './accesos/opciones/opciones.component';

@NgModule({
  declarations: [QrcodeComponent, DetalleComponent, OpcionesComponent],
  imports: [
    CommonModule
  ], exports: [QrcodeComponent, DetalleComponent, OpcionesComponent]
})
export class CompartidosModule { }
