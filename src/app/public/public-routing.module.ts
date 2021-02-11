import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from 'src/app/services/guards/login.guard';
import { PublicComponent } from './public.component';

const routes: Routes = [
  { path: '', canActivate: [LoginGuard], component: PublicComponent, children: [
    {
      path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
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
export class PublicRoutingModule { }
