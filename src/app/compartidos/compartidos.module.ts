import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrcodeComponent } from './accesos/qrcode/qrcode.component';
import { DetalleComponent } from './accesos/detalle/detalle.component';

@NgModule({
  declarations: [QrcodeComponent, DetalleComponent],
  imports: [
    CommonModule
  ], exports: [QrcodeComponent, DetalleComponent]
})
export class CompartidosModule { }
