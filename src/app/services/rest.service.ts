import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { Observable, throwError } from "rxjs";

import { catchError, map } from "rxjs/operators";
import { CookieService } from "ngx-cookie-service";
import { SharedService } from '../modules/shared/shared.service';
@Injectable({
  providedIn: 'root'
})
export class RestService {
  public headers: HttpHeaders;
  public readonly url: string = environment.api;

  constructor(
    public http: HttpClient,
    private router: Router,
    private sharedService: SharedService,
    private cookieService: CookieService
  ) {}

  parseHeader = () => {
    const token = this.cookieService.get("session");
    let header = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    if (token) {
      header["Authorization"] = `Bearer ${token}`;
    }
    return new HttpHeaders(header);
  };

  checkSession = (verify = false) => {
    return new Promise((resolve, reject) => {
      if (verify) {
        this.get("token", false).subscribe(
          (data) => {
            this.cookieService.set(
              "session",
              data.token,
              environment.daysTokenExpire,
              "/"
            );
            resolve(data.token);
          },
          (err) => {
            console.log(err);
            this.router.navigate(["/", "auth"]);
            reject(false);
          }
        );
      } else {
        if (this.cookieService.check("session")) {
          resolve(true);
        } else {
          this.router.navigate(["/", "auth"]);
          reject(false);
        }
      }
    });
  };

  handleError = (code = 401, message = "") => {
    try {
      switch (code) {
        case 401:
          // this.cookieService.delete("session");
          break;
        case 404:
          // this.cookieService.delete("session");
          break;
        case 422:
          // this.cookieService.delete("session");
          break;
        default:
          // this.cookieService.delete("session");
          break;
      }
    } catch (e) {
      return 422;
    }
  };

  post(path = "", body = {}, toast = true): Observable<any> {
    try {
      return this.http
        .post(`${this.url}/${path}`, body, { headers: this.parseHeader() })
        .pipe(
          catchError((e: any) => {
            if (toast) {
              this.sharedService.showError("Error", e.statusText);
            }
            this.handleError(e.status, e.statusText);
            //do your processing here
            return throwError({
              status: e.status,
              statusText: e.statusText,
            });
          })
        );
    } catch (e) {
      console.log()
    }
  }

  patch(path = "", body = {}, toast = true): Observable<any> {
    try {
      return this.http
        .patch(`${this.url}/${path}`, body, { headers: this.parseHeader() })
        .pipe(
          catchError((e: any) => {
            if (toast) {
              this.sharedService.showError("Error", e.statusText);
            }
            this.handleError(e.status, e.statusText);
            //do your processing here
            return throwError({
              status: e.status,
              statusText: e.statusText,
            });
          })
        );
    } catch (e) {}
  }

  
  delete(path = "", toast = true): Observable<any> {
    try {
      return this.http
        .delete(`${this.url}/${path}`, { headers: this.parseHeader() })
        .pipe(
          catchError((e: any) => {
            if (toast) {
              this.sharedService.showError("Error", e.statusText);
            }
            this.handleError(e.status, e.statusText);
            //do your processing here
            return throwError({
              status: e.status,
              statusText: e.statusText,
            });
          })
        );
    } catch (e) {}
  }
  getLocal(path = "", toast = true): Observable<any> {
    try {
      let url = ' http://localhost:3001'
      return this.http
        .get(`${url}/${path}`)
        .pipe(
          catchError((e: any) => {
            if (toast) {
              this.sharedService.showError("Error", e.statusText);
            }
            this.handleError(e.status, e.statusText);
            return throwError({
              status: e.status,
              statusText: e.statusText,
            });
          })
        );
    } catch (e) {}
  }

  get(path = "", toast = true): Observable<any> {
    try {
      return this.http
        .get(`${this.url}/${path}`, { headers: this.parseHeader() })
        .pipe(
          catchError((e: any) => {
            if (toast) {
              this.sharedService.showError("Error", e.statusText);
            }
            this.handleError(e.status, e.statusText);
            return throwError({
              status: e.status,
              statusText: e.statusText,
            });
          })
        );
    } catch (e) {}
  }
}
