import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './cliente.component';
import { DetalhesProdutoComponent } from './detalhes-produto/detalhes-produto.component';

const routes: Routes = [
  { path: '', component: ClienteComponent },
  { path: 'produtos/:id', component:DetalhesProdutoComponent },
  { path: 'detalhes-usuario', loadChildren: () => import('./detalhes-usuario/detalhes-usuario.module').then(m => m.DetalhesUsuarioModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
