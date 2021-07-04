import { Subject } from 'rxjs';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  form: FormGroup;
  eventUsuarios: Subject<any> = new Subject<any>();
  usuarios: object;

  constructor(private generalService: GeneralService) {
    this.form = new FormGroup({
      search: new FormControl('', Validators.maxLength(50))
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.search(this.form.value);
  }

  private search(form: FormGroup): void{
    this.generalService.post(`api/cwpidc/portal/searchusers`, form).subscribe((resp: any) => {
      this.usuarios = resp.select;
      this.eventUsuarios.next(this.usuarios);
    });
  }

}
