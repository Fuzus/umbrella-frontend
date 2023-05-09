import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCart } from 'src/app/_models/product';
import { CartService } from 'src/app/_services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  itensCarrinho: ProductCart[] = [];
  total: number = 0;

  constructor(
    private carrinhoService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.itensCarrinho = this.carrinhoService.obtemCarrinho();
    this.calcularTotal();
  }

  removerProdutoCarrinho(produtoId: string | undefined) {
    this.itensCarrinho = this.carrinhoService.removerProdutoCarrinho(produtoId);
    this.calcularTotal();
  }

  calcularTotal() {
    this.total = this.itensCarrinho.reduce((prev, curr) => prev + (curr.price * curr.quantity), 0);
  }

  comprar() {
    alert("Parabéns! você finalizou a sua Compra");
    this.carrinhoService.limparCarrinho();
    this.router.navigate(["produtos"])
  }
}
