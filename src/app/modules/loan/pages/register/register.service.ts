import { Injectable } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  MANAGER_STEP_ONE = "one";
  MANAGER_STEP_TWO = "two";
  MANAGER_STEP_THREE = "three";

  public active: number = 0;
  public register: any = {};
  public user: any;
  public navigate: any = [];
  public numberItemsNavigation = 5;
  public showInfo: boolean = false;

  constructor(
    private rest: RestService,
  ) {
    for (var i = 0; i < this.numberItemsNavigation; i++) {
      i === 0 ? (this.navigate[i] = true) : (this.navigate[i] = false);
    }
    this.showInfo = false;

  }

  /**
   * GETTER AND SETTER
   */

  getActive(): any {
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
    if (sessionStorage.getItem(this.MANAGER_STEP_ONE)) {
      this.loadDataFromStorageOne();
      if (sessionStorage.getItem(this.MANAGER_STEP_TWO)) {
        this.loadDataFromStoragetwo();
        if (sessionStorage.getItem(this.MANAGER_STEP_THREE)) {
          this.loadDataFromStoragethree();
        }
      }
    } 
    this.show();
    
  }

  limitDesabledButton(limitPosition: number) {
    for (var i = 0; i < this.navigate.length; i++) {
      i < limitPosition
        ? (this.navigate[i] = false)
        : (this.navigate[i] = true);
    }
  }

  limitEnabledButton(limitPosition: number) {
    for (var i = 0; i < this.navigate.length; i++) {
      i <= limitPosition
        ? (this.navigate[i] = true)
        : (this.navigate[i] = false);
    }
  }

  loadDataFromStorageOne() {
    let one = JSON.parse(sessionStorage.getItem(this.MANAGER_STEP_ONE));
    this.register = { ...this.register, ...one };
    this.activeFormAndButton(1);
  }

  loadDataFromStoragetwo() {
    let two = JSON.parse(sessionStorage.getItem(this.MANAGER_STEP_TWO));
    this.register = { ...this.register, ...two };
    this.activeFormAndButton(2);
  }

  loadDataFromStoragethree() {
    let three = JSON.parse(sessionStorage.getItem(this.MANAGER_STEP_THREE));
    this.register = { ...this.register, ...three };
    this.activeFormAndButton(3);
  }

  enableForm(positionInArray: number) {
    this.navigate[positionInArray] = true;
  }

  saveOne() {
    // let {
    //   travelerBirthDay,
    //   country,
    //   travelerAddres,
    //   travelerGender,
    // } = this.register;
    // sessionStorage.setItem(
    //   this.MANAGER_STEP_TWO,
    //   JSON.stringify({
    //     travelerBirthDay,
    //     country,
    //     travelerAddres,
    //     travelerGender,
    //   })
    // );
  }


}
