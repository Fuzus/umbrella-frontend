import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationsService {

  constructor() { }

  public validarCpf(): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {
      var soma = 0;
      var resto;
      const cpf = control.value;
      if (cpf == "00000000000") return { cpfInvalid: true };

      for (let i = 1; i <= 9; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
      resto = (soma * 10) % 11;

      if ((resto == 10) || (resto == 11)) resto = 0;
      if (resto != parseInt(cpf.substring(9, 10))) return { cpfInvlid: true };

      soma = 0;
      for (let i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
      resto = (soma * 10) % 11;

      if ((resto == 10) || (resto == 11)) resto = 0;
      if (resto != parseInt(cpf.substring(10, 11))) return { cpfInvlid: true };
      return null;
    }
  }
}
