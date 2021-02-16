import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BitacoraRoutingModule } from './bitacora-routing.module';
import { BitacoraComponent } from './bitacora.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [BitacoraComponent],
  imports: [
    SharedModule,
    CommonModule,
    BitacoraRoutingModule
  ]
})
export class BitacoraModule { }
