import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

const materialComponents = [
  MatTableModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatInputModule,
  MatButtonModule,
  MatTooltipModule
];

@NgModule({
  imports: [CommonModule, materialComponents],
  exports: [materialComponents]
})
export class MaterialModule { }
