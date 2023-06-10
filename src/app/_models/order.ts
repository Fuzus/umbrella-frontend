import { Address } from "./address";
import { ProductCart, ProductDTO } from "./product";


export interface Order {
    userId?: string;
    status?: Status;
    paymentType?: number;
    number?: number;
    cvv?: number;
    cardName?: string;
    expireAt?: string;
    quota?: number;
    address?: Address;
    orderProducts?: ProductDTO[];
    id?: string;
    created?: string;
    statusStr?: string;
}

export enum paymentType {
    BOLETO = 2,
    CARTAO = 1
}

export enum Status {
    AGUARDANDO_PAGAMENTO = 1,
    PAGAMENTO_APROVADO = 2,
    PAGAMENTO_REJEITADO = 3,
    AGUARDANDO_ENTREGA = 4,
    EM_TRANSPORTE = 5,
    ENTREGUE = 6
}