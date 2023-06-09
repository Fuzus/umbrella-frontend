import { Image } from "./image";

export interface Product {
    name: string;
    description: string;
    price: number;
    unit: number;
    rating: number;
    id?: string;
    created?: Date;
    updated?: Date | null;
    active?: boolean;
    cover?: Image;
    images?: Image[];
}

export interface ProductDTO{
    productId: string;
    quantity: number;
    product?: Product;
}

export interface ProductCart extends Product {
    quantity: number;
    orderId?: string;
    total?: number;
}  
