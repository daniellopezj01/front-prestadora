import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { HttpClient } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
@Injectable({
  providedIn: "root",
})
export class SharedService {
  constructor(
    private toastr: ToastrService,
    public http: HttpClient,
    private cookieService: CookieService
  ) {}
  showSuccess(title = "", message = "") {
    this.toastr.success(message, title, {
      timeOut: 3000,
      titleClass: "titleSuccess",
      messageClass: "messageSuccess",
      toastClass: "containsSuccess",
    });
  }

  showError(title = "", message = "") {
    this.toastr.error(message, title, {
      timeOut: 3000,
      titleClass: "titleError",
      messageClass: "messageError",
      toastClass: "containsError",
    });
  }
}
