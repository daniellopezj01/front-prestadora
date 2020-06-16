import { RestService } from './../services/rest.service';
import { Injectable } from "@angular/core";
import {
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";

import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanLoad {
  fromSearch = false;
  showConfirm = false;
  constructor(
    private modalService: BsModalService,
    private router: Router,
    private RestService: RestService
  ) {}

  closeCb: boolean = false;
  modalRef: BsModalRef;
  config = {
    ignoreBackdropClick: false,
    keyboard: false,
  };

  public ValidConfirmDialog(boolean: boolean) {
    this.fromSearch = boolean;
  }

  public setShowConfirm(boolean: boolean) {
    this.showConfirm = boolean;
  }

  public getShowConfirm() {
    return this.showConfirm;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return false;
  }

  canActivateChild = () => {
    return this.RestService
      .checkSession(false)
      .then((a) => {
        return true;
      })
      .catch((e) => {
        return false;
      });
  };

  canDeactivate() {
    if (this.fromSearch) {
      return false;
    } else if (!this.showConfirm) {
      return true;
    } else {
      return true;
      // return this.leaveConfirm();
    }
  }
}
