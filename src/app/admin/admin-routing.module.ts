import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from 'src/app/services/guards/login.guard';
import { CheckedGuard } from 'src/app/services/guards/check/checked.guard';
import { AdminGuard } from 'src/app/services/guards/roles/admin.guard';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path: 'admin', canActivate: [LoginGuard, CheckedGuard , AdminGuard], component: AdminComponent, children: [
    { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
    { path: 'access', loadChildren: () => import('./accesos/accesos.module').then(m => m.AccesosModule) },
    { path: 'mdc', loadChildren: () => import('./mdc/mdc.module').then(m => m.MdcModule)}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
