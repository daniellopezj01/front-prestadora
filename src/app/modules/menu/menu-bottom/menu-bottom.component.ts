import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from "@angular/core";
import { Router } from "@angular/router";
import { MenuBottomService } from "./menu-bottom.service";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import {
  faUserFriends,
  faUserCog,
  faUserTie,
  faHome,
  faCommentsDollar,
  faUserEdit,
  faUser
} from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: "app-menu-bottom",
  templateUrl: "./menu-bottom.component.html",
  styleUrls: ["./menu-bottom.component.css"],
})
export class MenuBottomComponent implements OnInit {
  @ViewChild("actionOne") actionOne: ElementRef;
  @ViewChild("actionTwo") actionTwo: ElementRef;
  @ViewChild("actionThree") actionThree: ElementRef;
  @ViewChild("actionFour") actionFour: ElementRef;
  @ViewChild("actionFive") actionFive: ElementRef;

  arrayElements: any = [];
  message: string;
  actual: number = 0;
  faUserFriends = faUserFriends;
  faHome = faHome;
  faCommentsDollar = faCommentsDollar;
  faUserEdit = faUserEdit;
  faUser = faUser;

  addButton: string = "../../../../../assets/buttonMenu/addButton.svg";
  constructor(
    private router: Router,
    public menu: MenuBottomService,
    private cdRef: ChangeDetectorRef,
    private library: FaIconLibrary
  ) {
    library.addIcons(faUserFriends, faCommentsDollar,faUserEdit,faHome,faUser);
  }

  ngOnInit(): void {
    this.menu.position.subscribe((res) => {
      this.changeActivationFromSideBar(res);
    });
  }

  ngAfterViewInit(): void {
    if (this.arrayElements.includes(undefined)) {
      console.log("paila");
    }
    this.arrayElements = [
      this.actionOne,
      this.actionTwo,
      this.actionThree,
      this.actionFour,
      this.actionFive,
    ];

    this.cdRef.detectChanges();
  }

  action(position) {
    this.removeClass(this.arrayElements[this.actual]);
    this.addClass(this.arrayElements[position]);
    this.actual = position;
    switch (position) {
      case 0:
        this.router.navigate(["/home"]);
        break;
      case 1:
        this.router.navigate(["/home/task/projects"]);
        break;
      case 2:
        this.router.navigate(["/home/task/projects"]);
        break;
      case 3:
        console.log("3")
        this.router.navigate(["/home/register"]);
        break;
      case 4:
        this.router.navigate(["/home/user"]);
        break;
      default:
        break;
    }
  }

  addClass(button: ElementRef) {
    button.nativeElement.classList.add("activation");
  }

  removeClass(button: ElementRef) {
    button.nativeElement.classList.remove("activation");
  }

  containerClass(position) {
    if (
      this.arrayElements[position] !== undefined &&
      this.arrayElements.length > 0
    ) {
      return this.arrayElements[position].nativeElement.classList.contains(
        "activation"
      );
    }
    return false;
  }

  add() {
    this.arrayElements.forEach((element) => {
      this.removeClass(element);
    });
    this.router.navigate(["/home/task/add"]);
  }

  changeActivationFromSideBar(position: number) {
    if (
      this.arrayElements[position] !== undefined &&
      this.arrayElements.length > 0
    ) {
      this.arrayElements.forEach((element) => {
        this.removeClass(element);
      });
      this.arrayElements[position].nativeElement.classList.add("activation");
    }
  }
}
