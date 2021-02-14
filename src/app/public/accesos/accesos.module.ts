import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccesosRoutingModule } from './accesos-routing.module';
import { AccesosComponent } from './accesos.component';
import { SharedModule } from '../shared/shared.module';
import { ListadoComponent } from './listado/listado.component';
import { CompartidosModule } from 'src/app/compartidos/compartidos.module';
import { QrcodeComponent } from 'src/app/compartidos/accesos/qrcode/qrcode.component';

@NgModule({
  declarations: [AccesosComponent, ListadoComponent],
  imports: [
    CompartidosModule,
    SharedModule,
    CommonModule,
    AccesosRoutingModule,
    MatDialogModule
  ], entryComponents: [QrcodeComponent]
})
export class AccesosModule { }
