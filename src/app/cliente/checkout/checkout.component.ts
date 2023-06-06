import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCart } from 'src/app/_models/product';
import { CartService } from 'src/app/_services/cart.service';
import { OrderService } from 'src/app/_services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  itensCarrinho: ProductCart[] = []
  total: number = 0;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.itensCarrinho = this.cartService.obtemCarrinho();
    this.total = Number(sessionStorage.getItem("valorTotal"));
  }

  doCheckout() {
    this.orderService.checkout()?.subscribe(res => {
      if(res){
        if(res.success) {
          this.cartService.limparCarrinho()
          alert("Compra concluída com sucesso");
          this.router.navigate(["cliente"]);
        } else  {
          alert("Ocorreu um erro ao realiar a compra")
        }
      }
    })
  }
  

}
