import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from 'src/app/services/guards/login.guard';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  // { path: 'admin', canActivate: [LoginGuard], component: AdminComponent, children: [
  { path: 'admin', component: AdminComponent, children: [
    {
      path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
