import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangepassComponent } from './changepass.component';
import { LoginGuard } from 'src/app/services/guards/login.guard';

const routes: Routes = [
  {path: '', canActivate: [LoginGuard], component: ChangepassComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangepassRoutingModule { }
