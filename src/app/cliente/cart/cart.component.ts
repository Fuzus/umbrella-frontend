import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCart } from 'src/app/_models/product';
import { AccountService } from 'src/app/_services/account.service';
import { CartService } from 'src/app/_services/cart.service';
import { OrderService } from 'src/app/_services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  itensCarrinho: ProductCart[] = [];
  total: number = 0;
  valorFrete: number = 0;

  constructor(
    private carrinhoService: CartService,
    private orderService: OrderService,
    private accontService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.itensCarrinho = this.carrinhoService.obtemCarrinho();
    for(let itemCarrinho of this.itensCarrinho){
      if(itemCarrinho.images)
      itemCarrinho.cover = itemCarrinho.images.find(x => x.type == 1)
    }
    this.calcularTotal();
  }

  removerProdutoCarrinho(produtoId: string | undefined) {
    this.itensCarrinho = this.carrinhoService.removerProdutoCarrinho(produtoId);
    this.calcularTotal();
  }

  calcularTotal() {
    this.total = this.itensCarrinho.reduce((prev, curr) => prev + (curr.price * curr.quantity), 0) + this.valorFrete;
  }

  comprar() {
    this.router.navigate(["cliente/pagamento"])
    this.orderService.setOrderUser(this.accontService.userValue!);
    this.orderService.setOrderProduct(this.itensCarrinho);
  }

  adicionaFrete(valor: number) {
    this.valorFrete = valor;
    this.calcularTotal();
  }
}
