import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Address, enderecos } from '../_models/address';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit{

  enderecos: Address[] = []

  form = this.fb.group({
    name:["", Validators.minLength(3)],
    email:["", Validators.email],
    password: [""],
    confirmPassword: [""],
    cpf: [""],
    birth: [""]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router
  ){}

  ngOnInit(): void {
      this.enderecos = enderecos;
  }

  inserirEndereco() {
    this.router.navigate(['endereco'])
  }

}
