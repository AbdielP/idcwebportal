import { FormControl, FormGroup } from '@angular/forms';
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

  btnActivar(): void{}
  btnDesactivar(): void{}
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
            break;
          case 'desactivar':
            break;
          case 'bloquear':
            this.bloquear(1);
            break;
          case 'desbloquear':
            this.bloquear(0);
            break;
          default:
            // NADA, por ahora.
        }
      }
    });
  }

  private bloquear(estado: number): void {
    const body = { estado, idusuario: this.usuario.idusuario };
    this.generalService.patch(`api/cwpidc/portal/block?token=${this.localStorageService.getToken()}`, body)
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

  // Hacer el servicio para activar - desactivar (de verdad es necesario desactivar una ves activada? bloquear basta no?)
  // Enviar los datos del usuario actualizado para mostrarlos en pantalla
  // - Enviar estos datos al componente padre para que se muestre tambíen

}
