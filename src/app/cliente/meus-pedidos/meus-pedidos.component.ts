import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/_models/order';
import { OrderService } from 'src/app/_services/order.service';

@Component({
  selector: 'app-meus-pedidos',
  templateUrl: './meus-pedidos.component.html',
  styleUrls: ['./meus-pedidos.component.css']
})
export class MeusPedidosComponent implements OnInit{

  myOrders: Order[] = []

  constructor(
    private orderService: OrderService
  ){}

    ngOnInit(): void {
        this.orderService.getOrdersClient().subscribe(res => {
          this.myOrders = res
        });
    }

}
