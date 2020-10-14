import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MenuBottomService {
  visible: boolean = true;
  public position = 0;

  constructor() {
    this.visible = true;
  }

  setPosition(position) {
    this.position = position;
  }
  
  getPosition() {
    return this.position;
  }

  hide() {
    this.visible = false;
  }

  show() {
    this.visible = true;
  }

  toggle() {
    this.visible = !this.visible;
  }
}
