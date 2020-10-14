import {
  Component,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";
import { Router } from "@angular/router";
import { MenuBottomService } from "./menu-bottom.service";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import {
  faUserFriends,
  faHome,
  faCommentsDollar,
  faUserEdit,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: "app-menu-bottom",
  templateUrl: "./menu-bottom.component.html",
  styleUrls: ["./menu-bottom.component.css"],
})
export class MenuBottomComponent implements OnInit {
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
    library.addIcons(
      faUserFriends,
      faCommentsDollar,
      faUserEdit,
      faHome,
      faUser
    );
  }

  ngOnInit(): void {}


  ngAfterViewChecked(): void {
    this.actual = this.menu.getPosition();
    this.cdRef.detectChanges();
  }

  action(position) {
    this.menu.setPosition(position);
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
        this.router.navigate(["/home/register"]);
        break;
      case 4:
        this.router.navigate(["/home/user"]);
        break;
      default:
        break;
    }
  }
}
