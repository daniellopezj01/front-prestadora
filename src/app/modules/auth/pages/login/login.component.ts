import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MenuBottomService } from "src/app/modules/menu/menu-bottom/menu-bottom.service";
import { Router } from "@angular/router";
import { AuthGuard } from "src/app/guards/auth.guard";
import { RestService } from "src/app/services/rest.service";
import { environment } from "../../../../../environments/environment";
import { CookieService } from "ngx-cookie-service";
import {
  faEnvelope,
  faUnlockAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  
  /*** Icons **/
  faEnvelope = faEnvelope;
  faUnlockAlt=faUnlockAlt;

/** */
  loginForm: FormGroup;
  submitted = false;
  login: any = {};
  item: any;
  loading = false;

  @ViewChild("buttonLogin") buttonLogin: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private menu: MenuBottomService,
    private cdRef: ChangeDetectorRef,
    private rest: RestService,
    private cookieService: CookieService,
    private library: FaIconLibrary
  ) {
    library.addIcons(faEnvelope, faUnlockAlt);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      emailLogin: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(5)]],
    });
    this.rest.checkSession().then(
      (data) => {
        this.router.navigate(["/"]);
      },
      (err) => {
        this.router.navigate(["/"]);
      }
    );
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.rest.post("login", this.loginForm.value).subscribe(
      (data) => {
        const { token, user } = data;
        this.cookieService.set(
          "session",
          token,
          environment.daysTokenExpire,
          "/"
        );
        this.cookieService.set(
          "user",
          JSON.stringify(user),
          environment.daysTokenExpire,
          "/"
        );
        this.loading = false;
        this.router.navigate(["/home"]);
      },
      (err) => {
        console.log(this.loginForm.value);
        this.loading = false;
        this.clear();
        console.log(err);
      }
    );
  }

  clear() {
    this.login = {};
    this.cdRef.detectChanges();
  }

  actionButton() {
    this.buttonLogin.nativeElement.classList.add("pulse");
    setTimeout(() => {
      this.buttonLogin.nativeElement.classList.remove("pulse");
    }, 1000);
  }

  sendToForget() {
    this.router.navigate(["/auth/forget"]);
  }
}
