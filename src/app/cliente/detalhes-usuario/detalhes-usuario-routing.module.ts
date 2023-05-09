import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalhesUsuarioComponent } from './detalhes-usuario.component';

const routes: Routes = [
  { path: '', component: DetalhesUsuarioComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetalhesUsuarioRoutingModule { }
