import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Address, enderecos } from 'src/app/_models/address';
import { AddressService } from '../_services/address.service';

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
    type: ["Entrega"]
  });

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private addressService: AddressService
  ){}

  search() {
    this.addressService.seachCep(this.form.controls.zipCode.value? this.form.controls.zipCode.value: "").subscribe(res => {
      this.form.controls.zipCode.setValue(res.cep)
      this.form.controls.address.setValue(res.logradouro)
      this.form.controls.district.setValue(res.bairro)
    })
  }

  salvar() {
    const address: Address = {
      id: String(enderecos.length + 1),
      address: this.form.controls.address.value? this.form.controls.address.value : "",
      houseNumber: this.form.controls.houseNumber.value? Number(this.form.controls.houseNumber.value) : 0,
      district: this.form.controls.district.value? this.form.controls.district.value : "",
      zipCode: this.form.controls.zipCode.value? this.form.controls.zipCode.value :  "",
      type: this.form.controls.type.value? this.form.controls.type.value : undefined,
      default: false
    }
    enderecos.push(address);
    this.location.back()
  }
}
