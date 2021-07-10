import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import Swal from 'sweetalert2';


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
      idusuario: new FormControl(''),
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
        this.form.patchValue({
          idusuario: (this.usuario.idusuario)
        });
      });
    });
  }

  onSubmit(): void {
    this.patchPassword(this.form.value);
  }

  private patchPassword(form: FormGroup): void {
    this.generalService.patch(`api/cwpidc/portal/changepass?token=${this.localStorageService.getToken()}`, form)
    .subscribe(resp => {
      console.log(resp);
    }, (error) => {
      console.log(error);
    });
  }

  activar(): void{}
  desactivar(): void{}
  bloquear(): void {
    this.swalConfirm(`¿Bloquear este usuario?`);
  }
  desbloquear(): void{}

  private swalConfirm(mensaje: string): void {
    Swal.fire({
      title: mensaje,
      // showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Guardar`,
      // denyButtonText: `No guardar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Cambios guardados', '', 'success');
      } else if (result.isDenied) {
        Swal.fire('Los cambios no fueron guardados', '', 'info');
      }
    });
  }

}
