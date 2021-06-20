import { LocalstorageService } from './../../../services/localstorage/localstorage.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { SeguridadService } from 'src/app/services/seguridad.service';
import { Observable, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {

  formpreguntas: FormGroup;
  spreguntas: Array<string>;

  eventSubscription: Subscription;
  @Input() events: Observable<any>;

  constructor(private seguridadService: SeguridadService, private localstorageService: LocalstorageService, private fb: FormBuilder) {
    this.formpreguntas = new FormGroup({
      password: new FormControl('', Validators.required),
      re_password: new FormControl('', Validators.required),
      preguntaForm: this.fb.group({
        pregunta: [''],
        respuesta: ['']
      }),
      preguntaForm2: this.fb.group({
        pregunta: [''],
        respuesta: ['']
      }),
      preguntaForm3: this.fb.group({
        pregunta: [''],
        respuesta: ['']
      })
    });
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
    this.insertSecurityQuestions(this.formpreguntas.value, this.localstorageService.getToken());
  }

  private getSecurityQuestions(token: string): void {
    this.seguridadService.select(`api/cwpidc/squestions?token=${token}`).subscribe((resp: any) => {
      this.spreguntas = resp.select;
      // console.log(this.spreguntas);
    });
  }

  private insertSecurityQuestions(form: any, token: string): void {
    this.seguridadService.insert(`api/cwpidc/squestions?token=${token}`, form).subscribe((resp: any) => {
      console.log(resp);
      Swal.fire(
        '¡Completado!',
        `${resp.message}`,
        'success'
      );
    });
  }

  private subscribeEvent(): void {
    this.eventSubscription = this.events.subscribe(({formPassword}) => {
      // console.log(formPassword);
      this.formpreguntas.patchValue({
        password: formPassword.password,
        re_password: formPassword.re_password
      });
      console.log(this.formpreguntas.value);
    });
  }


}
