import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdcRoutingModule } from './mdc-routing.module';
import { MdcComponent } from './mdc.component';
import { CompartidosModule } from 'src/app/compartidos/compartidos.module';


@NgModule({
  declarations: [MdcComponent],
  imports: [
    CommonModule,
    MdcRoutingModule,
    CompartidosModule
  ]
})
export class MdcModule { }
