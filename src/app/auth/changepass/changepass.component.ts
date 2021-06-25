import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CustomValidators } from 'src/app/utils/custom-validators';
import { GeneralService } from 'src/app/services/general.service';
import { SeguridadService } from 'src/app/services/seguridad.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent implements OnInit{

  eventError: Subject<any> = new Subject();
  eventPreguntas: Subject<any> = new Subject();
  questionsCount: number;
  hiddeQuestions = false;
  form: FormGroup;

  showSpinner = false;
  counter = 5;

  constructor(private router: Router, private localstorageservice: LocalstorageService , private generalService: GeneralService,
              private seguridadService: SeguridadService, public authService: AuthService) {
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

  ngOnInit(): void {}

  onSubmit() {
    const formPassword = this.form.value;
    this.showSpinner = true;
    this.countPreguntasUsuario(formPassword);
  }

  private updatePassword(url: string, form: any): void {
    // NO PUEDO ACTUALIZAR EL TOKEN, Los guard no lo detectan...
    this.generalService.update(url, form, this.localstorageservice.getToken()).subscribe((resp: any) => {
      if (resp.ok) {
        this.counter = 5;
        const interval = setInterval(() => {
          this.counter--;
          if (this.counter === 0) {
            clearInterval(interval);
            this.authService.logOut();
          }
        }, 1000);
        this.swalAlert(resp.message);
      }
    }, (err) => {
      this.showSpinner = false;
      this.eventError.next(err);
    });
  }

  // SELECT COUNT preguntas de usuario
  private countPreguntasUsuario(formPassword) {
    this.seguridadService.select(`api/cwpidc/usersq?token=${this.localstorageservice.getToken()}`)
    .subscribe((resp: any) => {
      this.questionsCount = resp.select[0].registros;
      if (this.questionsCount < 3) {
        // emitir el formulario hacia el componente 'preguntas' y mostrar el form preguntas
        this.eventPreguntas.next({formPassword});
        this.hiddeQuestions = true;
      } else {
        this.updatePassword('api/cwpidc/cfp', formPassword);
      }
    }, (err) => {
      this.showSpinner = false;
      console.log(err); // Aquí van los errores del backend...
    });
  }

  private swalAlert(message: string): void {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500
    });
  }
}
