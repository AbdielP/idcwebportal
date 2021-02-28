import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdcRoutingModule } from './mdc-routing.module';
import { MdcComponent } from './mdc.component';


@NgModule({
  declarations: [MdcComponent],
  imports: [
    CommonModule,
    MdcRoutingModule
  ]
})
export class MdcModule { }
