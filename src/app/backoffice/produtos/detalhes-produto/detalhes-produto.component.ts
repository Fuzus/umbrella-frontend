import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from 'src/app/produto';
import { ProdutosService } from 'src/app/services/produtos.service';

@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.css']
})
export class DetalhesProdutoComponent implements OnInit {

  produto: Produto | undefined;
  codigo = "";
  nome = "";
  preco = "";
  quantidade = "";
  situacao = false;
  imagem = "";

  titulo = "Cadastrar produto"

  constructor(
    private produtoService: ProdutosService,
    private activateRouter: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const routeParams = this.activateRouter.snapshot.paramMap;
    const codigoProduto = Number(routeParams.get('id'));

    if(codigoProduto > 0) {
      this.titulo = "Alterar dados do produto"
      this.produto = this.produtoService.getOne(codigoProduto);
    }

    if(this.produto) {
      this.codigo = String(this.produto.codigo);
      this.nome = this.produto.nome;
      this.preco = String(this.produto.preco);
      this.quantidade = String(this.produto.quantidade);
      this.situacao = this.produto.situacao;
      this.imagem = this.produto.imagem;
    }
  }

  salvar() {
    const novoProduto: Produto = {
      codigo: Number(this.codigo),
      nome: this.nome,
      preco: Number(this.preco.replace(".", "").replace(",", ".")),
      quantidade: Number(this.quantidade),
      situacao: this.situacao,
      imagem: this.imagem
    };

    if(this.produto) {
      this.produtoService.update(this.produto.codigo, novoProduto);
    } else {
      this.produtoService.insert(novoProduto);
    }
    this.router.navigate(["backoffice/produtos"]);
  }

  cancelar() {
    this.router.navigate(["backoffice/produtos"]);
  }
}
