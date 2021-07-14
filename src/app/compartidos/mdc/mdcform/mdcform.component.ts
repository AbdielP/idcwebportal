import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { DateService } from 'src/app/services/date.service';
import { GeneralService } from 'src/app/services/general.service';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { CustomValidators } from 'src/app/utils/custom-validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mdcform',
  providers: [DatePipe],
  templateUrl: './mdcform.component.html',
  styleUrls: ['./mdcform.component.css']
})
export class MdcformComponent implements OnInit {

  SwalParameters: any = {
    icon: 'success',
    title: 'Personal agregado.',
    text: '',
    footer: '',
    backdrop: `rgba(0,0,0,0.4)`,
    timer: 5000
  };

  hoy: any;
  mdcForm: any;
  projects: any;
  userroll: number;
  roles = [];
  showSpinner = false;

  lastmdc: Date;

  constructor(private formBuilder: FormBuilder, public dateService: DateService, private localstorageService: LocalstorageService,
              private generalService: GeneralService, private datePipe: DatePipe) {
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
      version: [{value: '', disabled: false}, {validators: [Validators.required]}],
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
  private getUserRoll() {
    this.userroll = this.localstorageService.getUserRoll();
    if (this.userroll === 2) {
      this.mdcForm.patchValue({
        rollId: 2,
        link: 'na'
      });
    }
  }
  // LLama de la BD los roles existentes para crear cuentas
  private getRoles(): void {
      this.generalService.select(`api/cwpidc/portal`).subscribe((resp: any) => {
      this.roles = resp.select;
    });
  }

  private getProyectos(): void {
      this.generalService.select(`api/cwpidc/general/all/proyectos`).subscribe((resp: any) => {
      this.projects = resp.select;
    });
  }
  // Lista los proyectos del usuario logeado si es CLIENTE
  private getUserProyectos(): void {
    this.generalService.select(`api/cwpidc/general/proyectos?token=${this.localstorageService.getToken()}`)
    .subscribe((resp: any) => {
      this.projects = resp.select;
    });
  }

  onSubmit(){
    if (!this.mdcForm.valid){
      alert('Fomulario no válido');
      return;
    }
    this.showSpinner = true;
    this.agregarUsuarioMatriz(this.mdcForm.getRawValue());
    // console.log(this.mdcForm.getRawValue());
  }

  // Captura el proyecto seleccionado para traer su ultima versión de MDC (lado admin)
  onChange(event: any): void {
    // console.log(event.target.value);
    const proyecto = {id: Number(event.target.value)};
    this.generalService.post(`api/cwpidc/portal/mdc/maxversion`, proyecto)
    .subscribe(resp => {
      // console.log(resp);
      this.lastmdc = resp.select.ultima_version;
      this.patchFormLastMDC(this.lastmdc);
    });
  }
 // !!!!!!!!!!!!!!!!!!!!!!! HERE
  private patchFormLastMDC(versionmdc: Date): void {
    // console.log(versionmdc);
    this.mdcForm.patchValue({
      version: this.datePipe.transform(versionmdc, 'yyyy/MM/dd')
    });
    // console.log(this.mdcForm.value);
  }

  private agregarUsuarioMatriz(form: any) {
    this.generalService.insertNewUser(form).subscribe((resp: any) => {
      if (resp.ok) {
        this.SwalParameters.text = `${resp.message}`;
        Swal.fire(this.SwalParameters);
      }
      this.showSpinner = false;
    });
  }

  agregarMDC() {
    const mdcFormGroup = this.formBuilder.group({
      proyecto: ['', {validators: [Validators.required]}],
      link: ['', {validators: [Validators.required]}],
      version: [this.hoy, {validators: [Validators.required]}],
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
