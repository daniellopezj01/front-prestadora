import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {

  constructor(private   coockies: CookieService,private router:Router) { }

  ngOnInit(): void {
  }
  logOut(){
    this.coockies.deleteAll("/");
    this.router.navigate(["/auth/login"]);
  }
}
