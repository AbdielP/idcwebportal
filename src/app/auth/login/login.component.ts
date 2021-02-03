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
    console.log(form);
    // if (form.invalid) { return; }
    // this.authService.login(form, `sp_select_datos_usuario('${form.value.usrn}')`).subscribe((resp: any) => {
    //   if (resp.ok) {
    //     this.router.navigate([`/`]);
    //   }
    // });
  }
}
