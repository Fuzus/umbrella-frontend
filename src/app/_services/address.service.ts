import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(
    private http: HttpClient
  ) { }

  seachCep(cep: string){
    return this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`).pipe(
      map(res => res)
    )
  }

}
