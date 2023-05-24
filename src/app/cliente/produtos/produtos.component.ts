import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/_models/product';
import { ProductService } from 'src/app/_services/product.service';
import { AuthGuard } from 'src/app/auth.guard';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private authGuard : AuthGuard
  ) { }

  ngOnInit(): void {
    this.authGuard.isLoggedIn()
    this.productService.getAllCliente().subscribe(res => {
      this.products = res;
      for (let product of this.products) {
        if (product.images)
          product.cover = product.images.find(x => x.type == 1);
      }
    })
  }
}
