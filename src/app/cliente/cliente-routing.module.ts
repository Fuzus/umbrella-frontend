import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  { path: '', redirectTo:'produtos', pathMatch:"full" },
  { path: 'detalhes-usuario', loadChildren: () => import('./detalhes-usuario/detalhes-usuario.module').then(m => m.DetalhesUsuarioModule), canActivate: [AuthGuard] },
  { path: 'produtos', loadChildren: () => import('./produtos/produtos.module').then(m => m.ProdutosModule) },
  { path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule) },
  { path: 'pagamento', loadChildren: () => import('./pagamento/pagamento.module').then(m => m.PagamentoModule), canActivate: [AuthGuard] },
  { path: 'checkout', loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule) },
  { path: 'pedidos', loadChildren: () => import('./meus-pedidos/meus-pedidos.module').then(m => m.MeusPedidosModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
