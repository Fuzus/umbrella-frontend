import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../_models/api.response';
import { Product } from '../_models/product';
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
}
