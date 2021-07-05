import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios.component';
import { DetalleUsuariosComponent } from './detalle-usuarios/detalle-usuarios.component';

const routes: Routes = [
  {path: '', component: UsuariosComponent},
  {path: 'detail', component: DetalleUsuariosComponent, children: [
    {path: '', loadChildren: () => import('./detalle-usuarios/detalle-usuarios.module').then(m => m.DetalleUsuariosModule)},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
