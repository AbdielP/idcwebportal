import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from 'src/app/services/guards/login.guard';
import { CheckedGuard } from 'src/app/services/guards/check/checked.guard';
import { ClienteGuard } from 'src/app/services/guards/roles/cliente.guard';
import { PublicComponent } from './public.component';

const routes: Routes = [
  { path: '', canActivate: [LoginGuard, CheckedGuard , ClienteGuard], component: PublicComponent, children: [
    { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
    { path: 'access', loadChildren: () => import('./accesos/accesos.module').then(m => m.AccesosModule) },
    { path: 'bitacora', loadChildren: () => import('./bitacora/bitacora.module').then(m => m.BitacoraModule) },
    { path: 'mdc', loadChildren: () => import('./mdc/mdc.module').then(m => m.MdcModule)}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
