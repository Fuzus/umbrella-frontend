import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-detalhes-usuario',
  templateUrl: './detalhes-usuario.component.html',
  styleUrls: ['./detalhes-usuario.component.css']
})
export class DetalhesUsuarioComponent implements OnInit {
  titulo = "Adicionar Novo Usuario";

  form = this.fb.group({
    nome: ["", [
      Validators.minLength(3),
      Validators.required
    ]],
    cpf: ["", [
      Validators.minLength(11),
      Validators.maxLength(11),
      Validators.required,
      this.validarCpf()
    ]],
    email: ["", [
      Validators.email,
      Validators.required
    ]],
    senha: ["", []],
    confirmaSenha: ["", []],
    cargo: ["", [Validators.required]],
    situacao: [false, [Validators.required]]
  })

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private actvatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const routeParams = this.actvatedRoute.snapshot.paramMap;
    const usuarioId = routeParams.get("id");

    if (usuarioId) {
      this.titulo = "Editar dados do usuario"
      this.accountService.getById(usuarioId).subscribe(res => {
        if (res) {
          this.form.controls.nome.setValue(res.nome ? res.nome : "");
          this.form.controls.cpf.setValue(res.cpf ? String(res.cpf) : "");
          this.form.controls.email.setValue(res.userName ? res.userName : "");
          this.form.controls.email.disable({onlySelf: true});
          this.form.controls.cargo.setValue(res.roles ? res.roles[0].toLowerCase() : "");
          this.form.controls.situacao.setValue(res.lockoutEnabled ? !res.lockoutEnabled : true);
        }
      });
    }
  }

  salvar() {
    this.router.navigate(["backoffice/usuarios"]);
  }

  validarCpf(): ValidatorFn {

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
