import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { InfoComponent } from './info/info.component';
import { ModulosComponent } from './modulos/modulos.component';

@NgModule({
  declarations: [DashboardComponent, InfoComponent, ModulosComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
