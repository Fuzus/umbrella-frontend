import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  
  form = this.fb.group({
    name: ["", [
      Validators.required,
      Validators.maxLength(200)
    ]],
    
    rating: ["", [
      Validators.required
    ]],

    price: ["", [
      Validators.required
    ]],

    unit: ["", [
      Validators.required
    ]],

  })

  titulo = "Cadastrar produto"

  constructor(
    private fb: FormBuilder,
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
      // this.codigo = String(this.produto.codigo);
      // this.nome = this.produto.nome;
      // this.preco = String(this.produto.preco);
      // this.quantidade = String(this.produto.quantidade);
      // this.situacao = this.produto.situacao;
      // this.imagem = this.produto.imagem;
    }
  }

  salvar() {
    
  }

  cancelar() {
    this.router.navigate(["backoffice/produtos"]);
  }
}
