import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit{

  form = this.fb.group({
    number: [""],
    cvv: [""],
    cardName: [""],
    expireAt: [""],
    quota: [""],
    paymentType: [""]
  })

  constructor(
    private fb: FormBuilder
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
}
