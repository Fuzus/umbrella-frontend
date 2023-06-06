import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagamentoRoutingModule } from './pagamento-routing.module';
import { PagamentoComponent } from './pagamento.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PagamentoComponent
  ],
  imports: [
    CommonModule,
    PagamentoRoutingModule,
    ReactiveFormsModule
  ]
})
export class PagamentoModule { }
