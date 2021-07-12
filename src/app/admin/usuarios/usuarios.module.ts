import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';

import { MaterialModule } from 'src/app/material/material.module';
import { DetalleUsuarioComponent } from './detalle-usuario/detalle-usuario.component';
import { CompartidosModule } from 'src/app/compartidos/compartidos.module';


@NgModule({
  declarations: [UsuariosComponent, ListaUsuariosComponent, DetalleUsuarioComponent],
  imports: [
    CompartidosModule,
    CommonModule,
    UsuariosRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class UsuariosModule { }
