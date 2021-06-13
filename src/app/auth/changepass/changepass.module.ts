import { BackenderrorsComponent } from 'src/app/compartidos/backenderrors/backenderrors.component';
import { CompartidosModule } from 'src/app/compartidos/compartidos.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatSnackBarModule} from '@angular/material/snack-bar';

import { ChangepassRoutingModule } from './changepass-routing.module';
import { ChangepassComponent } from './changepass.component';
import { PreguntasComponent } from './preguntas/preguntas.component';

@NgModule({
  declarations: [ChangepassComponent, PreguntasComponent],
  imports: [
    CompartidosModule,
    CommonModule,
    ReactiveFormsModule,
    ChangepassRoutingModule,
    MatSnackBarModule
  ], exports: [MatSnackBarModule],
  entryComponents: [BackenderrorsComponent]
})
export class ChangepassModule { }
