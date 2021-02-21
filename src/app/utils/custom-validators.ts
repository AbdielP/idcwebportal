import { AbstractControl } from '@angular/forms';

export class CustomValidators {

    // Valida que los campos 'changepassword' tengan el mismo valor
    static equalValues(control: AbstractControl) {
    if (control.value.password !== control.value.re_password) {
        return {equalValues: true};
    }
    return null;
    }
}
