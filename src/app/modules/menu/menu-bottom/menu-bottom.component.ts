import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from "@angular/core";
import { Router } from "@angular/router";
import { MenuBottomService } from "./menu-bottom.service";

@Component({
  selector: "app-menu-bottom",
  templateUrl: "./menu-bottom.component.html",
  styleUrls: ["./menu-bottom.component.css"]
})
export class MenuBottomComponent implements OnInit {
  @ViewChild("actionTask") actionTask: ElementRef;
  @ViewChild("actionMenu") actionMenu: ElementRef;
  @ViewChild("actionCreate") actionCreate: ElementRef;
  @ViewChild("actionFavorite") actionFavorite: ElementRef;
  @ViewChild("actionProfile") actionProfile: ElementRef;

  arrayElements: any = [];
  message: string;

  // Set icons
  taskIcon: string = "../../../../../assets/buttonMenu/myTask.svg";
  taskActive: string = "../../../../../assets/buttonMenu/myTaskActive.svg";
  menuIcon: string = "../../../../../assets/buttonMenu/menu.svg";
  menuActive: string = "../../../../../assets/buttonMenu/menuActive.svg";
  quickIcon: string = "../../../../../assets/buttonMenu/quick.svg";
  quickActive: string = "../../../../../assets/buttonMenu/quickActive.svg";
  profileIcon: string = "../../../../../assets/buttonMenu/profile.svg";
  profileActive: string = "../../../../../assets/buttonMenu/profileActive.svg";
  addButton: string = "../../../../../assets/buttonMenu/addButton.svg";
  constructor(
    private router: Router,
    public menu: MenuBottomService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.menu.position.subscribe(res => {
      this.changeActivationFromSideBar(res);
    });

  }

  ngAfterViewInit(): void {
    this.arrayElements = [
      this.actionTask,
      this.actionMenu,
      this.actionFavorite,
      this.actionProfile
    ];
    this.cdRef.detectChanges();
  }

  action(event, name) {
    this.arrayElements.forEach(element => {
      if (
        event === element.nativeElement ||
        event === element.nativeElement.children[0] ||
        event === element.nativeElement.children[0].children[0]
      ) {
        this.addClass(element);
        switch (name) {
          case "task":
            this.router.navigate(["/home"]);
            break;
          case "menu":
            this.router.navigate(["/home/task/projects"]);
            break;
          case "favorite":
            this.router.navigate(["/home/task/quick"]);
            break;
          case "profile":
            this.router.navigate(["/home/user"]);
            break;
          default:
            break;
        }
      } else {
        this.removeClass(element);
      }
    });
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
    this.arrayElements.forEach(element => {
      this.removeClass(element);
    });
    this.router.navigate(["/home/task/add"]);
  }

  changeActivationFromSideBar(position: number) {
    if (
      this.arrayElements[position] !== undefined &&
      this.arrayElements.length > 0
    ) {
      this.arrayElements.forEach(element => {
        this.removeClass(element);
      });
      this.arrayElements[position].nativeElement.classList.add("activation");
    }
  }
}
