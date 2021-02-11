import { Usuario } from 'src/app/classes/usuario.class';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  year: number;

  constructor(private router: Router, private authService: AuthService) { }

  onSubmit(form: NgForm): void {
    if (form.invalid) { return; }
    const usuario = new Usuario(form.value.usrn, form.value.pswd);
    this.authService.login(usuario, `sp_select_datos_usuario('${usuario.usrn}')`).subscribe((resp: any) => {
      if (resp.ok) {
        if (resp.usuario.roll === 'cliente') {
          this.router.navigate([`/`]);
        } else if (resp.usuario.roll === 'idc') {
          this.router.navigate([`/admin`]);
        }
      }
    });
  }
}
