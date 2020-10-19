import { Injectable } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import * as _ from 'lodash'
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  REGISTER_COOKIES = "register";
  STEP_COOKIES = "Step";

  public active: number = 0;
  public register: any = {};
  public user: any;
  public navigate: any = [];
  public numberItemsNavigation = 4;
  public showInfo: boolean = false;


  constructor(private rest: RestService, private cookies: CookieService) {
    for (var i = 0; i < this.numberItemsNavigation; i++) {
      this.navigate[i] = (i === 0) ? true : false;
    }
    this.showInfo = false;
    this.loadDataFromSessionStorage()
  }

  /**
   * GETTER AND SETTER
   */

  getActive(): number {
    return this.active;
  }

  setActive(number: number): void {
    this.active = number;
  }

  activeNavigation(number: number) {
    this.navigate[number] = true;
  }

  getregister(): any {
    return this.register;
  }

  public activeFormAndButton(number: number): void {
    this.setActive(number);
    this.activeNavigation(number);
  }

  setRegister(register): void {
    this.register = register;
  }

  show() {
    this.showInfo = true;
  }

  hide() {
    this.showInfo = false;
  }
  getshowInfo() {
    return this.showInfo;
  }

  loadIdInStorage(key, item: any) {
    localStorage.setItem(key, JSON.stringify(item));
  }
  /**
   * LOGIC FUNCTIONS
   */

  public loadDataFromSessionStorage() {
    if (this.cookies.check(this.REGISTER_COOKIES)) {
      this.register = JSON.parse(this.cookies.get(this.REGISTER_COOKIES))
    }
    if (this.cookies.check(this.STEP_COOKIES)) {
      this.active = Number.parseInt(this.cookies.get(this.STEP_COOKIES))
      this.limitEnabledButton(this.active)
    }
    this.show();
  }

  limitEnabledButton(limitPosition: number) {
    for (var i = 0; i < this.navigate.length; i++) {
      this.navigate[i] = i <= limitPosition ? true : false;
    }
  }

  enableForm(positionInArray: number) {
    this.navigate[positionInArray] = true;
  }

  setStorage(register) {
    this.cookies.set(this.REGISTER_COOKIES, JSON.stringify(register))
    this.cookies.set(this.STEP_COOKIES, `${this.getActive()}`)
  }
}
