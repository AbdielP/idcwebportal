import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangepassRoutingModule } from './changepass-routing.module';
import { ChangepassComponent } from './changepass.component';

@NgModule({
  declarations: [ChangepassComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChangepassRoutingModule
  ]
})
export class ChangepassModule { }
