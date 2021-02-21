import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { CustomValidators } from 'src/app/utils/custom-validators';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent {

  form: FormGroup;
  token: any;

  constructor(localstorageService: LocalstorageService) {
    this.token = localstorageService.getToken();
    this.form = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      re_password: new FormControl('', [Validators.required, Validators.minLength(8)])
    }, { validators: [CustomValidators.equalValues]});
  }

  onSubmit() {
    console.log(this.form.value);
  }

}
