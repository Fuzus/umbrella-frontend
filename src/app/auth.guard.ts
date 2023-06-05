import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from './_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private router: Router,
    private accountService: AccountService
  ){}

  isLoggedIn() {
    const token = localStorage.getItem('access-token');
    if (token != this.accountService.userValue?.token)
      this.accountService.getUserData().subscribe()
    return !!token;
  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.isLoggedIn()){
      return true;
    }
    this.router.navigate(["login"]);
    return false;
  }
  
}
