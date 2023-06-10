import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/_models/order';
import { AccountService } from 'src/app/_services/account.service';
import { OrderService } from 'src/app/_services/order.service';

@Component({
  selector: 'app-detalhes-pedido',
  templateUrl: './detalhes-pedido.component.html',
  styleUrls: ['./detalhes-pedido.component.css']
})
export class DetalhesPedidoComponent implements OnInit {

  order: Order | undefined
  numeroCartao: string | undefined
  isWorker: boolean = false;
  status: number | undefined;

  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get("id");
    if (id) {
      const roles = this.accountService.userValue?.roles;
      if(roles){
        if(roles.includes("client")){
          this.getOrderClient(id);
        } else {
          this.getOrderWorker(id);
        }
      }
    }
  }

  getOrderClient(id: string){
    this.orderService.getOrderByIdClient(id).subscribe(res => {
      this.order = res;
      this.status = res.status;
      this.numeroCartao = res.number? String(res.number) : undefined
      if(this.numeroCartao) {
        if(this.numeroCartao.length > 4)
        this.numeroCartao = this.numeroCartao.substring(this.numeroCartao.length - 4);
      }
    });
  }

  getOrderWorker(id: string) {
    this.orderService.getOrderByIdWorker(id).subscribe(res => {
      this.order = res;
      this.status = res.status;
      this.isWorker = true;
      this.numeroCartao = res.number? String(res.number) : undefined
      if(this.numeroCartao) {
        if(this.numeroCartao.length > 4)
        this.numeroCartao = this.numeroCartao.substring(this.numeroCartao.length - 4)
      }
    });
  }

  changeStatus() {
    const orderNewStatus = {
      orderId: this.order?.id,
      status: Number(this.status)
    };

    this.orderService.updateOrderStatus(orderNewStatus).subscribe(res => {
      if(res) {
        alert("Status Alterado com sucesso");
        window.location.reload();
      }
    });
  }
}
