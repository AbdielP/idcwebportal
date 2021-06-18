import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CustomValidators } from 'src/app/utils/custom-validators';
import { GeneralService } from 'src/app/services/general.service';
import { Subject } from 'rxjs';
import { SeguridadService } from 'src/app/services/seguridad.service';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent implements OnInit{

  eventError: Subject<any> = new Subject();
  questionsCount: number;
  hiddeQuestions = false;
  form: FormGroup;

  constructor(private router: Router, private localstorageservice: LocalstorageService , private generalService: GeneralService,
              private seguridadService: SeguridadService) {
    this.form = new FormGroup({
      password: new FormControl('', [Validators.required, CustomValidators.longitud, CustomValidators.number,
        CustomValidators.lowerCase, CustomValidators.uppercase, CustomValidators.specialCharacter]),
      re_password: new FormControl('', [Validators.required, Validators.minLength(8)])
    }, { validators: [CustomValidators.equalValues]});
    // this.form = new FormGroup({
    //   password: new FormControl(''),
    //   re_password: new FormControl('')
    // });
  }

  ngOnInit(): void {
   this.countPreguntasUsuario();
  }

  onSubmit() {
    if (this.questionsCount < 3) {
      // emitir el formulario hacia el componente 'preguntas'
    } else {
      this.updatePassword('api/cwpidc/cfp', this.form.value);
    }
  }

  updatePassword(url: string, form: any): void {
    // NO PUEDO ACTUALIZAR EL TOKEN, Los guard no lo detectan...
    this.generalService.update(url, form, this.localstorageservice.getToken()).subscribe((resp: any) => {
      if (resp.ok) {
        console.log(resp.message);
      }
      // if (resp.usuario.roll === 'cliente') {
      //   this.router.navigate([`/`]);
      // } else if (resp.usuario.roll === 'idc') {
      //   this.router.navigate([`/admin`]);
      // }
    }, (err) => {
      this.eventError.next(err);
    });
  }

  // SELECT COUNT preguntas de usuario
  countPreguntasUsuario() {
    this.seguridadService.select(`api/cwpidc/usersq?token=${this.localstorageservice.getToken()}`)
    .subscribe((resp: any) => {
      this.questionsCount = resp.select[0].registros;
    });
  }
}
