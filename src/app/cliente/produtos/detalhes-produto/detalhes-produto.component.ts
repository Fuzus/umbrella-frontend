import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produto } from 'src/app/produto';
import { ProdutosService } from 'src/app/services/produtos.service';

@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.css']
})
export class DetalhesProdutoComponent implements OnInit{

  produto: Produto | undefined;
  quantidade = 1;

  constructor(
    private produtoService: ProdutosService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
      const routeParams = this.route.snapshot.paramMap;
      const prodCod = Number(routeParams.get("id"));

      this.produto = this.produtoService.getOne(prodCod);
  }

}
