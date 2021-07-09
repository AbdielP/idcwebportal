import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.css']
})
export class DetalleUsuarioComponent implements OnInit {

  @Input() events: Observable<any>;
  eventSubscription: Subscription;
  usuario: any = '';
  form: FormGroup;

  constructor(private generalService: GeneralService, private localStorageService: LocalstorageService) {
    this.form = new FormGroup({
      password: new FormControl(''),
      re_password: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.subscribeEventIdUsuario();
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }

  subscribeEventIdUsuario(): void {
    this.eventSubscription = this.events.subscribe(idusuario => {
      const usuario = {idusuario};
      this.generalService.post(`api/cwpidc/portal/userinfo?token=${this.localStorageService.getToken()}`, usuario).subscribe(resp => {
        console.log(resp.select);
        this.usuario = resp.select;
      });
    });
  }

  onSubmit(): void {
    console.log(this.form.value);
  }

  activar(): void{}
  desactivar(): void{}
  bloquear(): void{}
  desbloquear(): void{}

}