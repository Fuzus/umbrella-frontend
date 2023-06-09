import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User | undefined
  isWorker: boolean = false;
  isClient: boolean = false;

  constructor(
    private accountService: AccountService
  ) { }


  ngOnInit(): void {
    this.user = this.accountService.userValue ? this.accountService.userValue : undefined;
    this.accountService.isWorker.subscribe(() => {
      if(localStorage.getItem('user')) {
        const user = JSON.parse(localStorage.getItem('user')!);
        this.isWorker = user?.roles?.includes("Admin") || user?.roles?.includes("restockers") ? true : false;
        this.isClient = user?.roles?.includes("client")
      }
    });
  }

  handleHeaderClicked(param: string) {
    const subNavOuter = document.querySelector(`#${param}`),
      subNavInner = document.querySelector(`#${param} .subnav-inner`);

    if (subNavOuter != null && subNavInner != null) {
      const button = subNavOuter.previousElementSibling;
      if (button != null) {
        if (subNavOuter.clientHeight > 0) {
          subNavOuter.setAttribute("style", "heigh:0px;")
          button.classList.remove('active');
          return;
        }

        button.classList.toggle('active');
        const newHeight = `${subNavInner.clientHeight}px`;
        subNavOuter.setAttribute("style", `height: ${newHeight};`)
      }

    }

  }

  logout() {
    alert("Logout realizado com sucesso")
    this.accountService.logout();
  }

}
