import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeusPedidosComponent } from './meus-pedidos.component';
import { DetalhesPedidoComponent } from './detalhes-pedido/detalhes-pedido.component';

const routes: Routes = [
  { path: '', component: MeusPedidosComponent },
  { path: ':id', component: DetalhesPedidoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeusPedidosRoutingModule { }
