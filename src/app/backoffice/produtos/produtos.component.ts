import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/produto';
import { ProdutosService } from 'src/app/services/produtos.service';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';
import { Product } from 'src/app/_models/product';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  produtos: Product[] | undefined;

  constructor(
    private prodcutService: ProductService,
    private produtosService: ProdutosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.prodcutService.getAll().subscribe(res => this.produtos = res)
  }

  incluirProduto() {
    this.router.navigate(["backoffice/produtos/incluir"]);
  }

  editarProduto(codigoProduto: string | undefined) {
    this.router.navigate([`backoffice/produtos/${codigoProduto}`]);
  }

  excluirProduto(codigoProduto:string | undefined) {
    //this.produtos = this.produtosService.deletarProduto(codigoProduto);
  }

  visualizarProduto(codigoProduto: string | undefined) {
    this.router.navigate([`client/produtos/${codigoProduto}`]);
  }

  alterarFlagItemAtivo(produto: Product) {
    /**
     * @todo: Criar metodo que vai alterar a flag de ativo do produto
     */
  }

}
