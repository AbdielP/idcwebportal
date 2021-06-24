import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription, Subject } from 'rxjs';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { SeguridadService } from 'src/app/services/seguridad.service';
import { AuthService } from 'src/app/services/auth.service';
import { CustomValidators } from 'src/app/utils/custom-validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {

  eventError: Subject<any> = new Subject();
  formpreguntas: FormGroup;
  spreguntas: Array<string>;

  eventSubscription: Subscription;
  @Input() events: Observable<any>;

  showSpinner = false;
  counter = 5;

  constructor(private seguridadService: SeguridadService, private localstorageService: LocalstorageService, private fb: FormBuilder,
              public authService: AuthService) {
    this.formpreguntas = new FormGroup({
      password: new FormControl('', Validators.required),
      re_password: new FormControl('', Validators.required),
      preguntaForm: this.fb.group({
        pregunta: ['', Validators.required],
        respuesta: ['', [Validators.required, Validators.maxLength(50)]]
      }),
      preguntaForm2: this.fb.group({
        pregunta: ['', Validators.required],
        respuesta: ['', [Validators.required, Validators.maxLength(50)]]
      }),
      preguntaForm3: this.fb.group({
        pregunta: ['', Validators.required],
        respuesta: ['', [Validators.required, Validators.maxLength(50)]]
      })
    }, { validators: [CustomValidators.noRepeatQuestions]});
    // console.log(this.formpreguntas.controls.preguntaForm.get('pregunta').errors);
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscribeEvent();
    this.getSecurityQuestions(this.localstorageService.getToken());
  }

  onSubmit(): void {
    this.showSpinner = true;
    this.insertSecurityQuestions(this.formpreguntas.value, this.localstorageService.getToken());
  }

  private getSecurityQuestions(token: string): void {
    this.seguridadService.select(`api/cwpidc/squestions?token=${token}`).subscribe((resp: any) => {
      this.spreguntas = resp.select;
    });
  }

  private insertSecurityQuestions(form: any, token: string): void {
    this.seguridadService.insert(`api/cwpidc/squestions?token=${token}`, form).subscribe((resp: any) => {
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
      console.log(err); // Aquí van los errores del backend...
    });
  }

  private subscribeEvent(): void {
    this.eventSubscription = this.events.subscribe(({formPassword}) => {
      // console.log(formPassword);
      this.formpreguntas.patchValue({
        password: formPassword.password,
        re_password: formPassword.re_password
      });
    });
  }

  private swalAlert(message: string): void {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: message,
      showConfirmButton: true,
      timer: 1500
    });
  }

}
