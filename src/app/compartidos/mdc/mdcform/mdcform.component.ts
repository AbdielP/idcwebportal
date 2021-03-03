import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'app-mdcform',
  templateUrl: './mdcform.component.html',
  styleUrls: ['./mdcform.component.css']
})
export class MdcformComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private dateService: DateService) { }

  mdcForm = this.formBuilder.group({
    username: ['', {validators: [Validators.required]}],
    password: [{value: 'welcome', disabled: true}],
    nombre: ['', {validators: [Validators.required]}],
    apellido: ['', {validators: [Validators.required]}],
    cedula: [null],
    correo: ['', {validators: [Validators.required]}],
    telefono: [''],
    celular: [''],
    rollId: ['', {validators: [Validators.required]}],
    direccion: [''],
    cargo: [''],
    departamento: [''],
    createdAt: this.dateService.getDate(),
    check_activo: [false],

    proyecto: ['', {validators: [Validators.required]}],
    version: [this.dateService.actualYear(), {validators:
      [Validators.required, Validators.min(2000), Validators.max(this.dateService.actualYear() + 1)]}],
    solicitar_acceso: [false],
    actualizar_acceso: [false],
    eliminar_acceso: [false],
    manos_remotas: [false],
    alertas_baja: [false],
    alertas_media: [false],
    alertas_alta: [false],
    editar_matriz: [false],
    proyectos: this.formBuilder.array([]), // FormArray
    link: ['', {validators: [Validators.required]}]
  });

  ngOnInit(): void {
  }

  onChange(event: any): void {
  }

}
