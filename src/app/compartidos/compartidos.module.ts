import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrcodeComponent } from './accesos/qrcode/qrcode.component';

@NgModule({
  declarations: [QrcodeComponent],
  imports: [
    CommonModule
  ], exports: [QrcodeComponent]
})
export class CompartidosModule { }
