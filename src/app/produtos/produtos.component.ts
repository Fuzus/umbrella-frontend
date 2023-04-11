import { Component, OnInit } from '@angular/core';
import { Produto, produtos } from '../produto';
import { ProdutosService } from '../services/produtos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  produtos: Produto[] | undefined;

  constructor(
    private produtosService: ProdutosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.produtos = this.produtosService.getAll();
  }

  incluirProduto() {
    this.router.navigate(["produtos/incluir"]);
  }

  editarProduto(codigoProduto: number) {
    this.router.navigate([`produtos/${codigoProduto}`]);
  }

  excluirProduto(codigoProduto:number) {
    this.produtos = this.produtosService.deletarProduto(codigoProduto);
  }

}
