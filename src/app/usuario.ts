export interface Usuario {
    id: number;
    nome: string;
    email: string;
    cargo: string;
    situacao: boolean;
    senha: string;
}

export const usuarios: Usuario[] = [
    { id: 1, nome: "admin", email: "admin@admin", cargo: "admin", situacao:true, senha: "admin" },
    { id: 2, nome: "admin", email: "admin@admin", cargo: "estoquista", situacao:false, senha: "admin" }
]