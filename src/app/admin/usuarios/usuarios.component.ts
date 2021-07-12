import { Subject } from 'rxjs';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, HostListener, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { SessionInactivityService } from 'src/app/services/session/session-inactivity.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  form: FormGroup;
  eventUsuarios: Subject<any> = new Subject<any>();
  eventDetalleUsuario: Subject<any> = new Subject<any>();
  usuarios: object;
  lastuserId: number;

  constructor(private generalService: GeneralService, private sessionInactivity: SessionInactivityService) {
    this.form = new FormGroup({
      search: new FormControl('', [Validators.required, Validators.maxLength(50)])
    });
  }

  @HostListener('window:mousemove') refreshUserState() {
    this.sessionInactivity.resetActivity();
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.search(this.form.value);
  }

  getUserId(idusuario: number): void {
    this.lastuserId = idusuario;
    this.emitIdUsuario();
  }

  private search(form: FormGroup): void{
    this.generalService.post(`api/cwpidc/portal/searchusers`, form).subscribe((resp: any) => {
      this.usuarios = resp.select;
      this.sendSearchUsers();
    });
  }

  private sendSearchUsers(): void {
    this.eventUsuarios.next(this.usuarios);
  }

  private emitIdUsuario(): void {
    this.eventDetalleUsuario.next(this.lastuserId);
  }

  // Recibe si hubo cambios en un usuario desde el componente hijo: app-detalle-usuario
  subscribeChanges(event: any): void {
    // No requiere el 'event'.
    this.search(this.form.value);
    this.emitIdUsuario();
  }

}
