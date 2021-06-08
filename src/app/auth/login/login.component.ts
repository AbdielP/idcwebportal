import { Usuario } from 'src/app/classes/usuario.class';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DateService } from 'src/app/services/date.service';
import { ErrorhandlerService } from 'src/app/services/error/errorhandler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  year: number;
  showSpinner = false;

  constructor(private router: Router, private authService: AuthService, private dateService: DateService,
              private errorHandler: ErrorhandlerService) {
    this.year = this.dateService.actualYear();
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) { return; }
    const usuario = new Usuario(form.value.usrn, form.value.pswd);
    this.showSpinner = true;
    this.authService.login(usuario).subscribe((resp: any) => {
      if (resp.ok) {
        if (resp.usuario.checked === 0) {
          return this.router.navigate([`/auth/initlogin`]);
        }
        if (resp.usuario.idroll === 2) {
          this.router.navigate([`/`]);
        } else if (resp.usuario.idroll === 1) {
          this.router.navigate([`/admin`]);
        }
      }
    }, (error) => {
      this.showSpinner = false;
      this.errorHandler.errorHandler(error);
      // console.log(error);
    });
  }
}
