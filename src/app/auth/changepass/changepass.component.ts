import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { CustomValidators } from 'src/app/utils/custom-validators';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent {

  form: FormGroup;

  constructor(private router: Router, private localstorageservice: LocalstorageService , private generalService: GeneralService) {
    this.form = new FormGroup({
      password: new FormControl('', [Validators.required, CustomValidators.longitud, CustomValidators.number,
        CustomValidators.lowerCase, CustomValidators.uppercase, CustomValidators.specialCharacter]),
      re_password: new FormControl('', [Validators.required, Validators.minLength(8)])
    }, { validators: [CustomValidators.equalValues]});
  }

  onSubmit() {
    console.log(this.form);
    this.updatePassword('api/cwpidc/cfp', this.form.value);
  }

  updatePassword(url: string, form: any): void {
    // NO PUEDO ACTUALIZAR EL TOKEN, Los guard no lo detectan...
    this.generalService.update(url, form, this.localstorageservice.getToken()).subscribe((resp: any) => {
      if (resp.usuario.roll === 'cliente') {
        this.router.navigate([`/`]);
      } else if (resp.usuario.roll === 'idc') {
        this.router.navigate([`/admin`]);
      }
    });
  }
}
