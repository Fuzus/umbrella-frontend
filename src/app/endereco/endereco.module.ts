import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnderecoRoutingModule } from './endereco-routing.module';
import { EnderecoComponent } from './endereco.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EnderecoComponent
  ],
  imports: [
    CommonModule,
    EnderecoRoutingModule,
    ReactiveFormsModule
  ]
})
export class EnderecoModule { }
