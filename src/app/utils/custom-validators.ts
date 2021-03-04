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
/*  Valida que no se repitan los datos de las matrices adicionales
    generadas en el formarray en el formularuo de crear usuario.
*/
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

// Valida que los campos 'changepassword' tengan el mismo valor
static equalValues(control: AbstractControl) {
    if (control.value.password !== control.value.re_password) {
        return {equalValues: true};
    }
    return null;
    }
}
