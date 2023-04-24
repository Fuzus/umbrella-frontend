import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address, enderecos } from 'src/app/_models/address';

@Component({
  selector: 'app-detalhes-usuario',
  templateUrl: './detalhes-usuario.component.html',
  styleUrls: ['./detalhes-usuario.component.css']
})
export class DetalhesUsuarioComponent implements OnInit{
  address: Address[] = [];

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
      this.address = enderecos;
  }

  inserirEndereco() {
    this.router.navigate(["cliente/detalhes-usuario/endereco"]);
  }

  deletarEndereco(id: string | undefined) {
    this.address = this.address.filter(x => x.id != id);
  }
}
