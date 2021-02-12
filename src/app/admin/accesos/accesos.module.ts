import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatDialogModule} from '@angular/material/dialog';

import { AccesosRoutingModule } from './accesos-routing.module';
import { AccesosComponent } from './accesos.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { ListadoComponent } from './listado/listado.component';
import { OpcionesComponent } from './opciones/opciones.component';

import { CompartidosModule } from 'src/app/compartidos/compartidos.module';
import { QrcodeComponent } from 'src/app/compartidos/accesos/qrcode/qrcode.component';
import { SharedModule } from 'src/app/public/shared/shared.module';

@NgModule({
  declarations: [AccesosComponent, BusquedaComponent, ListadoComponent, OpcionesComponent],
  imports: [
    CompartidosModule,
    SharedModule,
    CommonModule,
    AccesosRoutingModule,
    MatDialogModule
  ], exports: [
    MatDialogModule
  ], entryComponents: [QrcodeComponent]
})
export class AccesosModule { }
