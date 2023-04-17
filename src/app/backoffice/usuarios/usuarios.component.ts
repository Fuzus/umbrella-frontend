import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
import { User, UserRole } from 'src/app/_models/user';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: User[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    if (this.accountService.userValue) {
      if (this.accountService.userValue.isAdmin) {
        this.accountService.getAll().subscribe(res => this.usuarios = res);
        return;
      }
      alert("Você não possui acesso a esta tela")
      this.router.navigate(['backoffice']);
    }

  }

  editarUsuario(usuarioId: string) {
    this.router.navigate([`backoffice/usuarios/${usuarioId}`])
  }

  excluirUsuario(usuarioId: string) {
    //this.usuarios = this.usuarioService.delete(usuarioId);
  }

}
