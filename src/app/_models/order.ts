import { Address } from "./address";
import { ProductCart } from "./product";


export interface Order {
    userId?: string,
    status?: number,
    paymentType?: number,
    number?: number,
    cvv?: number,
    cardName?: string,
    expireAt?: string,
    quota?: number,
    address?: Address,
    orderProducts?: ProductCart[],
    id?: string
}

export enum paymentType {
    BOLETO = 2,
    CARTAO = 1


}