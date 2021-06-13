import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {

  formpreguntas: FormGroup;

  constructor() {
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
  }

  onSubmit(): void {}

}
