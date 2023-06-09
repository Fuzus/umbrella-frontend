import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/_models/order';
import { OrderService } from 'src/app/_services/order.service';

@Component({
  selector: 'app-detalhes-pedido',
  templateUrl: './detalhes-pedido.component.html',
  styleUrls: ['./detalhes-pedido.component.css']
})
export class DetalhesPedidoComponent implements OnInit {

  order: Order | undefined
  numeroCartao: string | undefined

  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get("id");
    if (id) {
      this.orderService.getOrderById(id).subscribe(res => {
        this.order = res;
        this.numeroCartao = res.number? String(res.number) : undefined
        if(this.numeroCartao) {
          if(this.numeroCartao.length > 4)
          this.numeroCartao = this.numeroCartao.substring(this.numeroCartao.length - 4)
        }
      });
    }
  }
}
