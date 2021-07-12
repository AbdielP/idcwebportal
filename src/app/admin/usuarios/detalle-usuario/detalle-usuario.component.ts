import { CustomValidators } from 'src/app/utils/custom-validators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Output() emitChanges: EventEmitter<any> = new EventEmitter();
  eventSubscription: Subscription;
  usuario: any = '';
  form: FormGroup;

  constructor(private generalService: GeneralService, private localStorageService: LocalstorageService) {
    this.form = new FormGroup({
      idusuario: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      re_password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)])
    }, { validators: [CustomValidators.equalValues] });
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
        // console.log(resp.select);
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

  btnActivar(): void {
    this.swalConfirm('activar', '¿Desea activar esta cuenta de usuario?');
  }
  // Desactivar cuentas por ahora está comentado en el html
  btnDesactivar(): void{
    this.swalConfirm('desactivar', '¿Desea desactivar esta cuenta de usuario?');
  }

  btnBloquear(): void {
    this.swalConfirm('bloquear', '¿Desea bloquear este usuario?');
  }
  btnDesbloquear(): void {
    this.swalConfirm('desbloquear', '¿Desea desbloquear este usuario?');
  }

  // Emite al componente padre 'usuarios.component' cuando se ha realizado una actualización del usuario
  sendChanges() {
    this.emitChanges.emit(true);
  }

  private swalConfirm(action: string, message: string): void {
    Swal.fire({ title: message, showCancelButton: true, confirmButtonText: `Guardar`
    }).then((result) => {
      if (result.isConfirmed) {
        switch (action) {
          case 'activar':
            this.patchEstado(1, `api/cwpidc/portal/activar?token=${this.localStorageService.getToken()}`);
            break;
          case 'desactivar':
            this.patchEstado(0, `api/cwpidc/portal/activar?token=${this.localStorageService.getToken()}`);
            break;
          case 'bloquear':
            this.patchEstado(1, `api/cwpidc/portal/block?token=${this.localStorageService.getToken()}`);
            break;
          case 'desbloquear':
            this.patchEstado(0, `api/cwpidc/portal/block?token=${this.localStorageService.getToken()}`);
            break;
          default:
            // NADA, por ahora.
        }
      }
    });
  }

  private patchEstado(estado: number, url: string): void {
    const body = { estado, idusuario: this.usuario.idusuario };
    this.generalService.patch(url, body)
    .subscribe(resp => {
      // console.log(resp);
      if (resp.ok === true) {
        Swal.fire(resp.message, '', 'success');
        this.sendChanges();
      }
    }, (error) => {
      console.log(error);
    });
  }

}
