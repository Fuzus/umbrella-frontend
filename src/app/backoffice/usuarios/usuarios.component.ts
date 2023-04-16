import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
import { UserRole } from 'src/app/_models/user';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] | undefined;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.usuarios = this.usuarioService.getAll();
    if(this.accountService.userValue) {
      if(this.accountService.userValue.role != UserRole.ADMIN) {
        alert("Você não possui acesso a esta tela")
        this.router.navigate(['backoffice']);
      }
    }

  }

  editarUsuario(usuarioId:number) {
    this.router.navigate([`backoffice/usuarios/${usuarioId}`])
  }

  excluirUsuario(usuarioId:number) {
    this.usuarios = this.usuarioService.delete(usuarioId);
  }

}
