import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/_models/product';
import { ProductService } from 'src/app/_services/product.service';
import { Produto } from 'src/app/produto';

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

    description: ["", [
      Validators.required,
      Validators.maxLength(2000)
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
    private productService: ProductService,
    private activateRouter: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const routeParams = this.activateRouter.snapshot.paramMap;
    const codigoProduto = Number(routeParams.get('id'));

    if(codigoProduto > 0) {
      this.titulo = "Alterar dados do produto"
      //this.produto = this.produtoService.getOne(codigoProduto);
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
    const produto: Product = {
      name: this.form.controls.name.value ? this.form.controls.name.value : "",
      description: this.form.controls.description.value? this.form.controls.description.value : "",
      rating: this.form.controls.rating.value? Number(this.form.controls.rating.value) : 0,
      price: this.form.controls.price.value? Number(this.form.controls.price.value.replace(".", "").replace(",", ".")) : 0.00,
      unit: this.form.controls.unit.value ? Number(this.form.controls.unit.value) : 0
    }

    if(this.produto) {

    } else {
      this.productService.insert(produto).subscribe(res => {
        if(res.success) {
          alert(`Produto ${res.data.name} adicionado com sucesso`);
          this.router.navigate(["backoffice/produtos"]);
        }
      })
    }
  }

  cancelar() {
    this.router.navigate(["backoffice/produtos"]);
  }
}
