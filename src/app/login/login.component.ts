import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email = "";
  senha = "";

  constructor(
    private authService: AccountService,
    private router: Router
  ) { }

  login() {
    this.authService.login(this.email, this.senha).subscribe(
      (res: boolean) => {
        if (res) {
          if(this.authService.userValue?.roles?.includes("client")){
            this.router.navigate(['cliente']);
          } else {
            this.router.navigate(["backoffice"])
          }
        } else {
          alert("Usuario ou senha incorretos");
        }
      }
    )
  }
}
