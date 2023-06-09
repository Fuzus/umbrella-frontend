import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../_models/api.response';
import { Product, ProductCart } from '../_models/product';
import { environment } from 'src/environments/environment.development';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<ApiResponse<Product[]>>(`${environment.apiUrl}/getProduct`).pipe(
      map( res => res.data )
    )
  }

  getAllCliente() {
    return this.http.get<ApiResponse<Product[]>>(`${environment.apiUrl}/getProductsUser`).pipe(
      map( res => res.data )
    )
  }

  insert(form: any) {
    return this.http.post<ApiResponse<Product>>(`${environment.apiUrl}/addProduct`, form).pipe(
      map( res => res )
    )
  } 

  getOne(id: string) {
    return this.http.get<ApiResponse<Product>>(`${environment.apiUrl}/getProductById?id=${id}`).pipe(
      map( res => res.data )
    )
  }

  update(form:any) {
    return this.http.put<ApiResponse<Product>>(`${environment.apiUrl}/updateProduct`, form).pipe(
      map(res => res)
    )
  }

  buy(products: ProductCart[]) {
    var test = true;
    products.forEach(x => {
      if (x.quantity > x.unit) {
        test = false;
        return;
      }
      x.unit -= x.quantity;
      this.updateUnit(x).subscribe(res => test = res);
    });
    return test;
  }

  updateUnit(product: Product){
    return this.http.put<ApiResponse<Product>>(`${environment.apiUrl}/updateProductUnit`, product).pipe(map(res => res.success));
  }
}
