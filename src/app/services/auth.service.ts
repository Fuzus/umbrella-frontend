import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

  constructor() { }

  login(email:string, senha:string): boolean {
    if(email === "admin" && senha === "admin"){
      localStorage.setItem("access-token", this.accessToken);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.clear();
  }
}
