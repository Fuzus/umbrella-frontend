import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email = "";
  senha = "";

  constructor(
    private auth: AuthService,
    private router: Router
  ){}

  login() {
    if(this.auth.login(this.email, this.senha)) {
      console.log("entro")
      this.router.navigate(["backoffice"]);
    }
    console.log("nao entro")
  }
}
