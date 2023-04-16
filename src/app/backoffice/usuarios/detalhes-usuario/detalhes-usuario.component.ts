import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/usuario';

@Component({
  selector: 'app-detalhes-usuario',
  templateUrl: './detalhes-usuario.component.html',
  styleUrls: ['./detalhes-usuario.component.css']
})
export class DetalhesUsuarioComponent implements OnInit {
  titulo = "Adicionar Novo Usuario";
  usuario: User | undefined;
  nome = "";
  cpf = "";
  email = "";
  senha = "";
  confirmSenha = "";
  cargo = "";
  situacao = false;

  constructor(
    private accountService: AccountService,
    private actvatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const routeParams = this.actvatedRoute.snapshot.paramMap;
    const usuarioId = routeParams.get("id");

    if (usuarioId) {
      this.titulo = "Editar dados do usuario"
      this.accountService.getById(usuarioId).subscribe(res => this.usuario = res);
      console.log(this.usuario);
    }

    if (this.usuario) {
      this.nome = this.usuario.nome ? this.usuario.nome : "";
      this.cpf = this.usuario.cpf ? this.usuario.cpf : "";
      this.email = this.usuario.userName ? this.usuario.userName : "";
      this.cargo = this.usuario.isAdmin ? "admin" : "Estoquista";
    }
  }

  salvar() {
    if (!this.validarCpf()) {
      alert("Numero do CPF invalido");
      return;
    }

    if(this.senha != "" && this.senha !== this.confirmSenha) {
      alert("As senhas não coincidem")
      return;
    }

    const novoUsuario: User = {
      nome: this.nome,
      cpf: this.cpf,
      userName: this.email,
      isAdmin: this.cargo == "admin",
    }

    if (this.usuario) {
      novoUsuario.id = this.usuario.id;
      //this.usuarioService.update(this.usuario.id, novoUsuario);
    } else {
      //this.usuarioService.insert(novoUsuario);
    }

    this.router.navigate(["backoffice/usuarios"]);
  }

  validarCpf(): boolean {
    var soma = 0;
    var resto;
    if (this.cpf == "00000000000") return false;

    for (let i = 1; i <= 9; i++) soma = soma + parseInt(this.cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11)) resto = 0;
    if (resto != parseInt(this.cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma = soma + parseInt(this.cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11)) resto = 0;
    if (resto != parseInt(this.cpf.substring(10, 11))) return false;
    return true;
  }

}
