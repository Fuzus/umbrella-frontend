import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Address, enderecos } from '../_models/address';
import { CustomValidationsService } from '../_services/custom-validations.service';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';
import { AddressService } from '../_services/address.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  enderecos: Address[] = []

  form = this.fb.group({
    name: ["", Validators.minLength(3)],
    email: ["", Validators.email],
    password: ["", [
      Validators.required
    ]],
    confirmPassword: ["", [
      Validators.required
    ]],
    cpf: ["", [
      Validators.minLength(11),
      Validators.maxLength(11),
      Validators.required,
      this.validationService.validarCpf()
    ]],
    birth: [""],
    gender: [""]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private validationService: CustomValidationsService,
    private accountService: AccountService,
    private addressService: AddressService
  ) { }

  ngOnInit(): void {
    this.enderecos = this.addressService.addresses;
  }

  inserirEndereco() {
    this.router.navigate(['endereco']);
  }

  salvar() {
    this.enderecos[0].principal = true;
    const newUser: User = {
      nome: this.form.controls.name.value ? this.form.controls.name.value : "",
      cpf: this.form.controls.cpf.value ? this.form.controls.cpf.value : "",
      masculino: this.form.controls.gender.value ? this.form.controls.gender.value == "true" : true,
      dataNascimento: this.form.controls.birth.value ? this.form.controls.birth.value : "",
      email: this.form.controls.email.value ? this.form.controls.email.value : "",
      password: this.form.controls.password.value ? this.form.controls.password.value : "",
      confirmPassword: this.form.controls.confirmPassword.value ? this.form.controls.confirmPassword.value : "",
      address: this.enderecos
    }

    this.accountService.registerClient(newUser).subscribe(res => {
      if (res.success) {
        this.router.navigate(['login'])
      }
    })
  }

  cancelar() {
    this.router.navigate(['login']);
  }

}
