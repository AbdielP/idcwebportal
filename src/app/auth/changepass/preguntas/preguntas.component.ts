import { LocalstorageService } from './../../../services/localstorage/localstorage.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SeguridadService } from 'src/app/services/seguridad.service';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {

  formpreguntas: FormGroup;
  spreguntas: Array<string>;

  constructor(private seguridadService: SeguridadService, private localstorageService: LocalstorageService) {
    this.formpreguntas = new FormGroup({
      q1: new FormControl (''),
      a1: new FormControl (''),
      q2: new FormControl(''),
      a2: new FormControl(''),
      q3: new FormControl(''),
      a3: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.getSecurityQuestions(this.localstorageService.getToken());
  }

  onSubmit(): void {
    console.log(this.formpreguntas.value);
  }

  getSecurityQuestions(token: string): void {
    this.seguridadService.select(`api/cwpidc/squestions?token=${token}`).subscribe((resp: any) => {
      this.spreguntas = resp.select;
      console.log(this.spreguntas);
    });
  }

}
