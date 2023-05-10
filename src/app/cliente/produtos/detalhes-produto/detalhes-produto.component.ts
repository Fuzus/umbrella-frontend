import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductCart } from 'src/app/_models/product';
import { CartService } from 'src/app/_services/cart.service';
import { ProductService } from 'src/app/_services/product.service';
import { Produto } from 'src/app/produto';
import { ProdutosService } from 'src/app/services/produtos.service';

@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.css']
})
export class DetalhesProdutoComponent implements OnInit{

  produto: Product | undefined;
  quantidade = 1;

  constructor(
    private produtoService: ProdutosService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ){}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const codigoProduto = routeParams.get('id');

    if(codigoProduto) {
      this.productService.getOne(codigoProduto).subscribe(res => {
        this.produto = res;
      })
    }
  }

  addToCart() {
    const product: ProductCart = {
      ...this.produto!,
      quantity: this.quantidade
    }
    this.cartService.adicionarAoCarrinho(product);
    alert("Produto Adicionado ao Carrinho");
  }

  changeImage(image: string) {
    const img = document.querySelector(".product-image__container img") as HTMLImageElement | null;
    if (img) {
      img.src = image;
    }
  }

}
