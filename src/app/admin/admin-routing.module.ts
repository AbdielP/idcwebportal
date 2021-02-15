import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from 'src/app/services/guards/login.guard';
import { AdminGuard } from '../services/guards/roles/admin.guard';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path: 'admin', canActivate: [LoginGuard, AdminGuard], component: AdminComponent, children: [
    {
      path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
      path: 'access', loadChildren: () => import('./accesos/accesos.module').then(m => m.AccesosModule)
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
