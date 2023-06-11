import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ProductCart } from 'src/app/_models/product';
import { CartService } from 'src/app/_services/cart.service';
import { OrderService } from 'src/app/_services/order.service';
import { Address } from 'src/app/_models/address';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  itensCarrinho: ProductCart[] = []
  total: number = 0;
  address: Address | undefined

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.itensCarrinho = this.cartService.obtemCarrinho();
    this.total = Number(sessionStorage.getItem("valorTotal"));
    this.address = this.orderService.order?.address
  }

  voltar() {
    this.location.back();
  }

  doCheckout() {
    this.orderService.checkout()?.subscribe(res => {
      if(res){
        if(res.success) {
          this.cartService.limparCarrinho()
          alert(`Compra concluída com sucesso, numero do pedido ${res.data.id}`);
          this.router.navigate(["cliente"]);
        } else  {
          alert("Ocorreu um erro ao realiar a compra")
        }
      }
    })
  }
  

}
