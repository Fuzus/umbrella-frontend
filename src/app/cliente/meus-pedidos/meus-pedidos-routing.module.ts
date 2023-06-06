import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeusPedidosComponent } from './meus-pedidos.component';

const routes: Routes = [{ path: '', component: MeusPedidosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeusPedidosRoutingModule { }
