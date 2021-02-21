import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'auth', component: AuthComponent, children: [
    {path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
    {path: 'initlogin', loadChildren: () => import('./changepass/changepass.module').then(m => m.ChangepassModule)}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
