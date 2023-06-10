import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order, Status, paymentType } from '../_models/order';
import { Address } from '../_models/address';
import { User } from '../_models/user';
import { ProductCart } from '../_models/product';
import { ApiResponse } from '../_models/api.response';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  order: Order | undefined;

  constructor(
    private http: HttpClient
  ) {
    if (!this.order) {
      this.order = {
        cardName: "",
        orderProducts: []
      }
    }
  }

  private setOrderAddress(address: Address) {
    this.order!.address = address;
  }

  setOrderUser(user: User) {
    this.setOrderAddress(user.address![0]);
  }

  setPayment(type: paymentType, quota?: number, cardNumber?: number, cvv?: number, cardName?: string, expireAt?: string) {
    this.order!.paymentType = type;
    this.order!.number = cardNumber;
    this.order!.cvv = cvv;
    this.order!.cardName = cardName;
    this.order!.expireAt = expireAt;
    this.order!.quota = quota;
  }

  setOrderProduct(productsCart: ProductCart[]) {
    productsCart.forEach(x => {
      this.order?.orderProducts?.push({
        productId: x.id!,
        quantity: x.quantity
      });
    });
  }

  checkout() {
    return this.http.post<ApiResponse<Order>>(`${environment.apiUrl}/Checkout`, this.order).pipe(
      map(res => {
        if (res.success) {
          return res;
        } else {
          return false;
        }
      })
    )
  }

  getOrdersClient() {
    return this.http.get<ApiResponse<Order[]>>(`${environment.apiUrl}/GetUserOrders`).pipe(
      map(res => res.data)
    )
  }

  getAllOrders(){
    return this.http.get<ApiResponse<Order[]>>(`${environment.apiUrl}/GetAllOrders`).pipe(
      map(res => res.data)
    )
  }

  getOrderByIdWorker(id: string) {
    return this.getOrderById(`${environment.apiUrl}/GetAdminOrderById?orderId=${id}`);
  }

  getOrderByIdClient(id:string) {
    return this.getOrderById(`${environment.apiUrl}/GetOrderById?orderId=${id}`);
  }

  getOrderById(url: string) {
    return this.http.get<ApiResponse<any>>(`${url}`).pipe(
      map(res => {
        return {
          userId: res.data.userId,
          status: res.data.status,
          paymentType: res.data.paymentType,
          number: res.data.number,
          cvv: res.data.cvv,
          cardName: res.data.cardName,
          expireAt: res.data.expireAt,
          quota: res.data.quota,
          address: {
            rua: res.data.rua,
            numero: res.data.numero,
            complemento: res.data.complemento,
            bairro: res.data.bairro,
            cidade: res.data.cidade,
            uf: res.data.uf,
            cep: res.data.cep,
            principal: true
          },
          orderProducts: res.data.orderProducts,
          id: res.data.id,
          created: res.data.created,
          statusStr: Status[res.data.status]
        }
      })
    )
  }

  updateOrderStatus(orderStatus:any) {
    return this.http.post<ApiResponse<Order>>(`${environment.apiUrl}/UpdateOrderStatus`, orderStatus).pipe(
      map(res => res.success)
    )
  }
}
