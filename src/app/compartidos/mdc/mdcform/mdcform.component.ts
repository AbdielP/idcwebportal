import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { DateService } from 'src/app/services/date.service';
import { GeneralService } from 'src/app/services/general.service';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { CustomValidators } from 'src/app/utils/custom-validators';

@Component({
  selector: 'app-mdcform',
  templateUrl: './mdcform.component.html',
  styleUrls: ['./mdcform.component.css']
})
export class MdcformComponent implements OnInit {

  hoy: any;
  mdcForm: any;
  projects: any;
  userroll: number;
  roles = [];

  constructor(private formBuilder: FormBuilder, public dateService: DateService, private localstorageService: LocalstorageService,
              private generalService: GeneralService) {
    this.hoy = this.dateService.getDate();
  }

  ngOnInit(): void {
    this.mdcForm = this.formBuilder.group({
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
      version: [this.hoy, [Validators.required]],
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
    }, { validators: [CustomValidators.noRepeatMDC, CustomValidators.noRepeatExtraMDC] });

    this.getUserRoll();
    if (this.userroll === 1) {
      this.getRoles();
      this.getProyectos();
    }
    if (this.userroll === 2) {
      this.getUserProyectos();
    }
  }

  get proyectos(){
    return this.mdcForm.get('proyectos') as FormArray;
  }

  // Obtiene del localstorage el roll del usuario logeado
  getUserRoll() {
    this.userroll = this.localstorageService.getUserRoll();
    if (this.userroll === 2) {
      this.mdcForm.patchValue({
        rollId: 2,
      });
    }
  }
  // LLama de la BD los roles existentes para crear cuentas
  getRoles(): void {
    this.generalService.select(`ppppccccc`, `sp_select_roles()`).subscribe((resp: any) => {
      this.roles = resp.select;
    });
  }

  getProyectos(): void {
    this.generalService.select(`ggggwwwwpppp`, `sp_select_proyectos`).subscribe((resp: any) => {
      this.projects = resp.select;
    });
  }
  // Lista los proyectos del usuario logeado si es CLIENTE
  getUserProyectos(): void {
    this.generalService.selectWithToken('ggggwwwwpppptoken', 'sp_clientes_select_proyectos', this.localstorageService.getToken())
    .subscribe((resp: any) => {
      this.projects = resp.select;
    });
  }

  onSubmit(){
    if (!this.mdcForm.valid){
      alert('Fomulario no válido');
      return;
    }
    // this.agregarUsuarioMatriz(this.token,this.mdcForm.getRawValue());
    console.log(this.mdcForm.getRawValue());
  }


  onChange(event: any): void {
  }

  agregarMDC() {
    const mdcFormGroup = this.formBuilder.group({
      proyecto: ['', {validators: [Validators.required]}],
      link: ['', {validators: [Validators.required]}],
      version: [this.hoy, {validators: [Validators.required, Validators.min(2000),
        Validators.max(this.dateService.actualYear() + 1)]}],
      solicitar_acceso: [false],
      actualizar_acceso: [false],
      eliminar_acceso: [false],
      manos_remotas: [false],
      alertas_baja: [false],
      alertas_media: [false],
      alertas_alta: [false],
      editar_matriz: [false]
    });
    this.proyectos.push(mdcFormGroup);
  }

  removerMDC(indice: number){
    this.proyectos.removeAt(indice);
  }

}
