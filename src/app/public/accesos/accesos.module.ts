import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccesosRoutingModule } from './accesos-routing.module';
import { AccesosComponent } from './accesos.component';
import { SharedModule } from '../shared/shared.module';
import { OpcionesComponent } from './opciones/opciones.component';

@NgModule({
  declarations: [AccesosComponent, OpcionesComponent],
  imports: [
    SharedModule,
    CommonModule,
    AccesosRoutingModule
  ]
})
export class AccesosModule { }
