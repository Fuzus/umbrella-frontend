import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Image } from 'src/app/_models/image';
import { Product, ProductCart } from 'src/app/_models/product';
import { AccountService } from 'src/app/_services/account.service';
import { CartService } from 'src/app/_services/cart.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.css']
})
export class DetalhesProdutoComponent implements OnInit {

  produto: Product | undefined;
  quantidade = 1;
  cep: string | undefined;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const codigoProduto = routeParams.get('id');

    if (codigoProduto) {
      this.productService.getOne(codigoProduto).subscribe(res => {
        this.produto = res;
        if (this.produto.images)
          this.changeImage(this.produto.images[0]);
      });
    }
    this.cep = this.accountService.userValue?.address?.find(x => x.principal)?.cep;
  }

  addToCart() {
    const product: ProductCart = {
      ...this.produto!,
      quantity: this.quantidade
    }
    this.cartService.adicionarAoCarrinho(product);
    alert("Produto Adicionado ao Carrinho");
    this.router.navigate(["cliente"])
  }

  changeImage(image: Image) {
    const img = document.querySelector(".product-image__container img") as HTMLImageElement | null;
    if (img) {
      img.src = image.source;
    }
  }

  calcularFrete() {
    const div = document.querySelector("#div-frete") as HTMLElement | null;
    if (div) {
      div.innerHTML += `
      <table>
        <tr>
            <td><label> Padrão <span style="font-weight: bold;">R$ 10,00</span></label></td>
            <td>
                <span>Produto chegará em 15 dias</span>
            </td>
        </tr>
        <tr>
            <td><label> Express <span style="font-weight: bold;">R$ 50,00</span></label></td>
            <td>
                <span>Produto chegará em 3 dias</span>
            </td>
        </tr>
        <tr>
            <td><label> Alternativa <span style="font-weight: bold;">R$ 15,00</span></label></td>
            <td>
                <span>Produto chegará em 13 dias</span>
            </td>
        </tr>
      </table>
      `

    }
  }

}
