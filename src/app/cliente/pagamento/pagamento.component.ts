import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { paymentType } from 'src/app/_models/order';
import { OrderService } from 'src/app/_services/order.service';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit{

  form = this.fb.group({
    number: ["", Validators.required],
    cvv: ["", Validators.required],
    cardName: ["", Validators.required],
    expireAt: ["", Validators.required],
    quota: ["", Validators.required],
    paymentType: ["", Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private orderService: OrderService
  ){}

  ngOnInit(): void {
      this.form.disable();
      this.form.controls.paymentType.enable()
  }

  formCartao(value: number) {
    if(value == 1) {
      this.form.enable()
    } else {
      this.form.reset()
      this.form.disable()
      this.form.controls.paymentType.enable()
      this.form.controls.paymentType.setValue("2")
    }
  }

  continuar() {
    if(this.form.errors){
      alert("Todos os campos devem ser preenchidos para pagameto com cartão de credito");
      return;
    }
    const paymentType: paymentType = Number(this.form.controls.paymentType.value)
    if(!paymentType) {
      alert("É necessario adicionar um metodo de pagamento")
      return;
    }
    this.orderService.setPayment(
      paymentType,
      this.form.controls.quota.value ? Number(this.form.controls.quota.value) : 0,
      this.form.controls.number.value ? Number(this.form.controls.number.value) : 0,
      this.form.controls.cvv.value ? Number(this.form.controls.cvv.value) : 0,
      this.form.controls.cardName.value ? this.form.controls.cardName.value : "string",
      this.form.controls.expireAt.value ? this.form.controls.expireAt.value : "string"
    );
    this.router.navigate(["cliente/checkout"]);
  }
}
