import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetalleUsuariosRoutingModule } from './detalle-usuarios-routing.module';
import { DetalleUsuariosComponent } from './detalle-usuarios.component';


@NgModule({
  declarations: [DetalleUsuariosComponent],
  imports: [
    CommonModule,
    DetalleUsuariosRoutingModule
  ]
})
export class DetalleUsuariosModule { }
