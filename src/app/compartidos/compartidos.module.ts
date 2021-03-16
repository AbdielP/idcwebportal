import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrcodeComponent } from './accesos/qrcode/qrcode.component';
import { DetalleComponent } from './accesos/detalle/detalle.component';
import { OpcionesComponent } from './accesos/opciones/opciones.component';
import { MdcformComponent } from './mdc/mdcform/mdcform.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdcListComponent } from './mdc/mdc-list/mdc-list.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { MdcOpcionesComponent } from './mdc/mdc-opciones/mdc-opciones.component';

@NgModule({
  declarations: [QrcodeComponent, DetalleComponent, OpcionesComponent, MdcformComponent, MdcListComponent, ProyectosComponent,
     MdcOpcionesComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ], exports: [QrcodeComponent, DetalleComponent, OpcionesComponent, MdcformComponent, MdcListComponent, ProyectosComponent,
    MdcOpcionesComponent]
})
export class CompartidosModule { }
