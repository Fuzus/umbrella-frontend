import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order, paymentType } from '../_models/order';
import { Address } from '../_models/address';
import { User } from '../_models/user';
import { ProductCart } from '../_models/product';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  order: Order | undefined;

  constructor(
    http: HttpClient
  ) {
    if (!this.order) {
      this.order = {
        cardName: "teste"
      }
    }
  }

  setOrderAddress(address: Address) {
    this.order!.address = address;
  }

  setOrderUser(user: User) {
    this.order!.userId = user.id;
    this.setOrderAddress(user.address![0]);
  }

  setPayment(type: paymentType,  quota: number, cardNumber?: number, cvv?: number, cardName?: string, expireAt?: string) {
    this.order!.paymentType = type;
    if (type == 1){
      this.order!.number = cardNumber;
      this.order!.cvv = cvv;
      this.order!.cardName = cardName;
      this.order!.expireAt = expireAt;
      this.order!.quota = quota;
    }
  }

  setOrderProduct(productsCart: ProductCart[]){
    this.order!.orderProducts = productsCart;
  }

}
