import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccesosRoutingModule } from './accesos-routing.module';
import { AccesosComponent } from './accesos.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { ListadoComponent } from './listado/listado.component';
import { OpcionesComponent } from './opciones/opciones.component';
import { DetalleComponent } from './detalle/detalle.component';

@NgModule({
  declarations: [AccesosComponent, BusquedaComponent, ListadoComponent, OpcionesComponent, DetalleComponent],
  imports: [
    CommonModule,
    AccesosRoutingModule
  ]
})
export class AccesosModule { }
