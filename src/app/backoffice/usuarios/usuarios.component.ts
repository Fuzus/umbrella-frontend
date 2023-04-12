import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] | undefined;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuarios = this.usuarioService.getAll();
  }

  editarUsuario(usuarioId:number) {
    this.router.navigate([`backoffice/usuarios/${usuarioId}`])
  }

  excluirUsuario(usuarioId:number) {
    this.usuarios = this.usuarioService.delete(usuarioId);
  }

}
