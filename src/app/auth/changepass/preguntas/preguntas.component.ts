import { LocalstorageService } from './../../../services/localstorage/localstorage.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SeguridadService } from 'src/app/services/seguridad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {

  formpreguntas: FormGroup;
  spreguntas: Array<string>;

  constructor(private seguridadService: SeguridadService, private localstorageService: LocalstorageService, private fb: FormBuilder) {
    this.formpreguntas = new FormGroup({
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

  ngOnInit(): void {
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
      Swal.fire(
        '¡Completado!',
        `${resp.message}`,
        'success'
      );
    });
  }

}
