import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class MenuBottomService {
  visible: boolean = true;
  public position = new BehaviorSubject(0);

  constructor() {
    this.visible = true;
  }

  changePositionClass(position: number) {
    this.position.next(position);
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
