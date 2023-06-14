import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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

  form = this.fb.group({
    nome: [""],
    dataNascimento: [""],
    genero: [""]
  })

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private addressService: AddressService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.accountService.getUserData().subscribe(res => {
      this.form.controls.nome.setValue(res.nome!);
      this.form.controls.dataNascimento.setValue(formatDate(res.dataNascimento!.substring(0, res.dataNascimento?.indexOf("T")), "yyyy-MM-dd", "pt-BR"));
      this.form.controls.genero.setValue(res.masculino? "true": "false");
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
    const user = {
      nome: this.form.controls.nome.value,
      dataNascimento: this.form.controls.dataNascimento.value + "T00:00:00.000Z",
      masculino: this.form.controls.genero.value == "true" ? true : false,
      address: this.address
    }
    this.accountService.update(user).subscribe(res => {
      if(res.success){
        alert("Dados alterados com sucesso!");
      } else {
        alert("Erro ao alterar os dados");
      }
    })
  }
}
