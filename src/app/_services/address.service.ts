import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Address } from '../_models/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  addresses: Address[] = []

  constructor(
    private http: HttpClient
  ) { }

  searchCep(cep: string){
    return this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`).pipe(
      map(res => res)
    )
  }

  addAddress(address: Address) {
    this.addresses.push(address);
  }

}
