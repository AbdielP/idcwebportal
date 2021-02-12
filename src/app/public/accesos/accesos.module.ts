import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccesosRoutingModule } from './accesos-routing.module';
import { AccesosComponent } from './accesos.component';
import { SharedModule } from '../shared/shared.module';
import { OpcionesComponent } from './opciones/opciones.component';
import { ListadoComponent } from './listado/listado.component';
import { CompartidosModule } from 'src/app/compartidos/compartidos.module';

@NgModule({
  declarations: [AccesosComponent, OpcionesComponent, ListadoComponent],
  imports: [
    CompartidosModule,
    SharedModule,
    CommonModule,
    AccesosRoutingModule,
    MatDialogModule
  ]
})
export class AccesosModule { }
