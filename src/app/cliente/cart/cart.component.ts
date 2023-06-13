import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from 'src/app/_models/address';
import { ProductCart } from 'src/app/_models/product';
import { AccountService } from 'src/app/_services/account.service';
import { AddressService } from 'src/app/_services/address.service';
import { CartService } from 'src/app/_services/cart.service';
import { OrderService } from 'src/app/_services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  itensCarrinho: ProductCart[] = [];
  total: number = 0;
  valorFrete: number = 0;
  address: Address[] = []
  UsingAdrress: Address | undefined

  constructor(
    private carrinhoService: CartService,
    private orderService: OrderService,
    private accontService: AccountService,
    private addressService: AddressService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.itensCarrinho = this.carrinhoService.obtemCarrinho();
    for (let itemCarrinho of this.itensCarrinho) {
      if (itemCarrinho.images)
        itemCarrinho.cover = itemCarrinho.images.find(x => x.type == 1)
    }
    this.calcularTotal();
    this.address = this.accontService.userValue?.address!;
    if (this.address) {
      this.UsingAdrress = this.address[0];
    } else {
      this.address = []
    }
    const newAddress = this.addressService.addresses;
    if (newAddress.length > 0) {
      this.address.push(...newAddress)
    }
  }

  removerProdutoCarrinho(produtoId: string | undefined) {
    this.itensCarrinho = this.carrinhoService.removerProdutoCarrinho(produtoId);
    this.calcularTotal();
  }

  calcularTotal() {
    this.total = this.itensCarrinho.reduce((prev, curr) => prev + (curr.price * curr.quantity), 0) + this.valorFrete;
  }

  comprar() {
    if(!this.UsingAdrress){
      alert("É necessario ter um endereço de entrega selecionado");
      return;
    }
    if(!this.valorFrete){
      alert("É necessario escolher um tipo de frete");
      return;
    }
    this.router.navigate(["cliente/pagamento"])
    this.orderService.setOrderAddress(this.UsingAdrress!);
    this.orderService.setOrderProduct(this.itensCarrinho);
  }

  adicionaFrete(valor: number) {
    this.valorFrete = valor;
    this.calcularTotal();
    sessionStorage.setItem("valorTotal", String(this.total));
  }

  inserirEndereco() {
    this.router.navigate(["endereco"])
  }

  alterarEndereco(address: Address) {
    this.UsingAdrress = address;
  }
}
