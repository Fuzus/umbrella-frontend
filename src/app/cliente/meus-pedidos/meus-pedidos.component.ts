import { Component, OnInit } from '@angular/core';
import { Order, Status } from 'src/app/_models/order';
import { AccountService } from 'src/app/_services/account.service';
import { OrderService } from 'src/app/_services/order.service';

@Component({
  selector: 'app-meus-pedidos',
  templateUrl: './meus-pedidos.component.html',
  styleUrls: ['./meus-pedidos.component.css']
})
export class MeusPedidosComponent implements OnInit {

  myOrders: Order[] = []

  constructor(
    private orderService: OrderService,
    private accounteService: AccountService
  ) { }

  ngOnInit(): void {
    const roles = this.accounteService.userValue?.roles;
    if (roles) {
      if (roles.includes("client")) {
        this.orderService.getOrdersClient().subscribe(res => {
          res.forEach(x => {
            if (x.status) {
              x.statusStr = Status[x.status]
            }
          })
          this.myOrders = res;
        })
      } else {
        this.orderService.getAllOrders().subscribe(res => {
          res.forEach(x => {
            if (x.status) {
              x.statusStr = Status[x.status]
            }
          })
          this.myOrders = res;
        })
      }
    }
  }

}
