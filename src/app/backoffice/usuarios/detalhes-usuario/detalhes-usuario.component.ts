import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/usuario';

@Component({
  selector: 'app-detalhes-usuario',
  templateUrl: './detalhes-usuario.component.html',
  styleUrls: ['./detalhes-usuario.component.css']
})
export class DetalhesUsuarioComponent implements OnInit {
  titulo = "Adicionar Novo Usuario";
  usuario: Usuario | undefined;
  nome = "";
  cpf = "";
  email = "";
  senha = "";
  confirmSenha = "";
  cargo = "";
  situacao = false;

  constructor(
    private usuarioService: UsuarioService,
    private actvatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const routeParams = this.actvatedRoute.snapshot.paramMap;
    const usuarioId = Number(routeParams.get("id"));

    if (usuarioId > 0) {
      this.titulo = "Editar dados do usuario"
      this.usuario = this.usuarioService.getOne(usuarioId);
      console.log(this.usuario);
    }

    if(this.usuario){
      this.nome = this.usuario.nome;
      this.email = this.usuario.email;
      this.cargo = this.usuario.cargo;
      this.situacao = this.usuario.situacao;
    }
  }

  salvar() {
    if(!this.validarCpf()) {
      alert("Numero do CPF invalido");
      return;
    }
    const novoUsuario: Usuario = {
      id: 0,
      nome: this.nome,
      email: this.email,
      cargo: this.cargo,
      situacao: this.situacao,
      senha: this.senha
    }

    if(this.usuario) {
      novoUsuario.id = this.usuario.id;
      this.usuarioService.update(this.usuario.id, novoUsuario);
    } else {
      this.usuarioService.insert(novoUsuario);
    }

    this.router.navigate(["backoffice/usuarios"]);
  }

  validarCpf(): boolean {
    var soma = 0;
    var resto;
  if (this.cpf == "00000000000") return false;

  for (let i=1; i<=9; i++) soma = soma + parseInt(this.cpf.substring(i-1, i)) * (11 - i);
  resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11))  resto = 0;
    if (resto != parseInt(this.cpf.substring(9, 10)) ) return false;

  soma = 0;
    for (let i = 1; i <= 10; i++) soma = soma + parseInt(this.cpf.substring(i-1, i)) * (12 - i);
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11))  resto = 0;
    if (resto != parseInt(this.cpf.substring(10, 11) ) ) return false;
    return true;
  }

}
