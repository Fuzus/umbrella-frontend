import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
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
  ){}

  login() {
    this.authService.login(this.email, this.senha).subscribe(
      (res: boolean) => {
        res ? this.router.navigate(['backoffice']) : null;
      }
    )
  }
}
