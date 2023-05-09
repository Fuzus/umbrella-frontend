export interface Address {
    id?: string;
    address: string;
    houseNumber: number;
    district: string;
    zipCode: string;
    default: boolean;
    type?: string;
}

export const enderecos: Address[] = [
    { id: "1", address: "Rua professor Alfredo Attié", houseNumber: 207, district: "PQ. Planalto", zipCode: "04841-340", default: true, type:"Faturamento" },
    { id: "2", address: "Rua professor Alfredo Attié", houseNumber: 209, district: "PQ. Planalto", zipCode: "04841-340" , default: false, type: "Entrega" }
]