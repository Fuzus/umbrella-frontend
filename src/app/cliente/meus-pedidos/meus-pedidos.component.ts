import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/_models/order';
import { AccountService } from 'src/app/_services/account.service';
import { OrderService } from 'src/app/_services/order.service';

@Component({
  selector: 'app-meus-pedidos',
  templateUrl: './meus-pedidos.component.html',
  styleUrls: ['./meus-pedidos.component.css']
})
export class MeusPedidosComponent implements OnInit{

  myOrders: Order[] = []

  constructor(
    private orderService: OrderService,
    private accounteService: AccountService
  ){}

    ngOnInit(): void {
      const roles = this.accounteService.userValue?.roles;
      if(roles) {
        if (roles.includes("client")){
          this.orderService.getOrdersClient().subscribe(res => {
            this.myOrders = res
          });
        } else {
          this.orderService.getAllOrders().subscribe(res => this.myOrders = res)
        }
      }
    }

}
