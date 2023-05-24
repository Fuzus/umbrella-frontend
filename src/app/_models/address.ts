export interface Address {
    id?: string;
    rua: string;
    numero: number;
    bairro: string;
    cep: string;
    principal: boolean;
    cidade: string;
    uf: string;
}

export const enderecos: Address[] = []