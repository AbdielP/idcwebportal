import { AbstractControl } from '@angular/forms';

export class CustomValidators {
    /*  Valida que no se repitan los datos de la matriz en el formulario
        para crear usuario con las matrices adicionales añadidas dinámi-
        camente en el formarray.
    */
   static noRepeatMDC(control: AbstractControl) {
        const proyectos = control.value.proyectos;
        for (const project of proyectos) {
            if (control.value.proyecto === project.proyecto) {
                return {noRepeatMDC: true};
            }
        }
        return null;
    }
    //  Valida que no se repitan los datos de las matrices adicionales generadas en el formarray en el formularuo de crear usuario.
    static noRepeatExtraMDC(control: AbstractControl) {
        const proyectos = control.value.proyectos;
        const array = [];
        if (proyectos.length > 0) {
            for (const project of proyectos) {
                array.push(parseInt(project.proyecto, 10));
            }
            if (!uniqueArray(array)) {
                return {noRepeatExtraMDC: true};
            }
        }

        return null;

        // Verifica si hay un valor REPETIDO en el arreglo - retorna True o False
        function uniqueArray(params: number[]) {
            return params.length === new Set(array).size;
        }
    }

    /**
     * Validaciones para cambiar primera password
     */

    // Valida que los campos 'changepassword' tengan el mismo valor
    static equalValues(control: AbstractControl) {
        if (control.value.password !== control.value.re_password) {
            return {equalValues: true};
        }
        return null;
    }

    // Longitud de caracteres
    static longitud(control: AbstractControl) {
        console.log(control.value.length)
        if (control.value.length < 8 || control.value.length > 20) {
            return { longitud: true };
        }
        return null;
    }

     // Valida que la contraseña tenga al menos 1 número
     static number(control: AbstractControl) {
        if ( !control.value.match(/^(?=.*\d)/)) {
            return { number: true };
        }
        return null;
    }

    // Valida que la contraseña tenga al menos 1 minúscula
    static lowerCase(control: AbstractControl) {
        if ( !control.value.match(/(?=.*[a-z])/)) {
            return { lowerCase: true };
        }
        return null;
    }

    // Valida que la contraseña tenga al menos 1 mayúscula
     static uppercase(control: AbstractControl) {
        if ( !control.value.match(/(?=.*[A-Z])/)) {
            return { uppercase: true };
        }
        return null;
    }

    // Valida que la contraseña tenga al menos 1 carácter especial
    static specialCharacter(control: AbstractControl) {
        if ( !control.value.match(/(?=.*[^a-zA-Z0-9])/)) {
            return { specialCharacter: true };
        }
        return null;
    }

}

