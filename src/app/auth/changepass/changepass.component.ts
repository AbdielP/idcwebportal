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
  token: any;

  constructor(localstorageService: LocalstorageService, private generalService: GeneralService) {
    this.token = localstorageService.getToken();
    this.form = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      re_password: new FormControl('', [Validators.required, Validators.minLength(8)])
    }, { validators: [CustomValidators.equalValues]});
  }

  onSubmit() {
    // console.log(this.form.value);
    this.updatePassword('cfp', 'sp_update_primera_password', this.form.value, this.token);
  }

  updatePassword(url: string, storedprocedure: string, form: any, token: any): void {
    this.generalService.update(url, storedprocedure, form, token).subscribe((resp: any) => {
      console.log(resp);
    });
  }

}
