import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Address } from 'src/app/_models/address';
import { AddressService } from '../_services/address.service';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css']
})
export class EnderecoComponent {

  form = this.fb.group({
    address: [""],
    houseNumber: [""],
    district: [""],
    zipCode: [""],
    default: ["true"],
    city: [""],
    state: [""],
  });

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private addressService: AddressService,
    private accountService: AccountService
  ){}

  search() {
    this.addressService.searchCep(this.form.controls.zipCode.value? this.form.controls.zipCode.value: "").subscribe(res => {
      this.form.controls.zipCode.setValue(res.cep);
      this.form.controls.address.setValue(res.logradouro);
      this.form.controls.district.setValue(res.bairro);
      this.form.controls.city.setValue(res.localidade);
      this.form.controls.state.setValue(res.uf)
    })
  }

  salvar() {
    const address: Address = {
      rua: this.form.controls.address.value? this.form.controls.address.value : "",
      numero: this.form.controls.houseNumber.value? Number(this.form.controls.houseNumber.value) : 0,
      complemento: "string",
      bairro: this.form.controls.district.value? this.form.controls.district.value : "",
      cep: this.form.controls.zipCode.value? this.form.controls.zipCode.value :  "",
      principal: false,
      cidade: this.form.controls.city.value? this.form.controls.city.value : "",
      uf: this.form.controls.state.value? this.form.controls.state.value : ""
    }
    this.addressService.addAddress(address);
    this.location.back()
  }
}
