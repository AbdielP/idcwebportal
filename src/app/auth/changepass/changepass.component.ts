import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { CustomValidators } from 'src/app/utils/custom-validators';
import { GeneralService } from 'src/app/services/general.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent {

  form: FormGroup;
  token: any;

  constructor(private router: Router, localstorageService: LocalstorageService, private generalService: GeneralService,
              private authService: AuthService) {
    this.token = localstorageService.getToken();
    this.form = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      re_password: new FormControl('', [Validators.required, Validators.minLength(8)])
    }, { validators: [CustomValidators.equalValues]});
  }

  onSubmit() {
    // console.log(this.form.value);
    this.updatePassword('cfp', this.form.value, this.token);
  }

  updatePassword(url: string, form: any, token: any): void {
    this.generalService.update(url, form, token).subscribe((resp: any) => {
      console.log(resp);
      localStorage.setItem('sti', resp.token);
      this.test(resp.usuario);
      // this.router.navigate([`/auth/login`]);
      // this.authService.clearStorage();
      // this.authService.setStorage(resp.token);
      // if (resp.usuario.roll === 'cliente') {
      //   this.router.navigate([`/`]);
      // } else if (resp.usuario.roll === 'idc') {
      //   this.router.navigate([`/admin`]);
      // }
    });
  }

  test(usuario: any) {
    if (usuario.roll === 'cliente') {
        this.router.navigate([`/`]);
      } else if (usuario.roll === 'idc') {
        this.router.navigate([`/admin`]);
      }
  }

}
