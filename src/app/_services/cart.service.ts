import { Injectable } from '@angular/core';
import { ProductCart } from '../_models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  itens: ProductCart[] = [];


  constructor() { }

  obtemCarrinho() {
    this.itens = JSON.parse(localStorage.getItem("carrinho") || "[]");
    return this.itens;
  }

  adicionarAoCarrinho(produto: ProductCart) {
    const test = this.itens.find(x => x.id == produto.id);

    test ? test.quantity += produto.quantity : this.itens.push(produto);

    localStorage.setItem("carrinho", JSON.stringify(this.itens));
  }

  limparCarrinho() {
    this.itens = [];
    localStorage.clear();
  }

  removerProdutoCarrinho(produtoId: string | undefined) {
    if (produtoId) {
      this.itens = this.itens.filter(x => x.id !== produtoId);
      localStorage.setItem("carrinho", JSON.stringify(this.itens));
    }
    return this.itens;
  }
}
