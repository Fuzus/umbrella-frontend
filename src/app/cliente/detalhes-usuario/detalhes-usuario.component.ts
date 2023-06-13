import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address, enderecos } from 'src/app/_models/address';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { AddressService } from 'src/app/_services/address.service';

@Component({
  selector: 'app-detalhes-usuario',
  templateUrl: './detalhes-usuario.component.html',
  styleUrls: ['./detalhes-usuario.component.css']
})
export class DetalhesUsuarioComponent implements OnInit {
  address: Address[] = [];
  user: User | undefined;

  constructor(
    private accountService: AccountService,
    private addressService: AddressService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.accountService.getUserData().subscribe(res => {
      this.user = res;
      this.address = res.address!;
      this.address.push(... this.addressService.addresses)
    });
  }

  inserirEndereco() {
    this.router.navigate(["endereco"]);
  }

  deletarEndereco(id: string | undefined) {
    this.address = this.address.filter(x => x.id != id);
  }

  salvar() {
  }
}
