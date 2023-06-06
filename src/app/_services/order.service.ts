import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order, paymentType } from '../_models/order';
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
}
