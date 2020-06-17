import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ToastrModule } from "ngx-toastr";
import { CookieService } from "ngx-cookie-service";
import { MenuModule } from './modules/menu/menu.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MenuModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ToastrModule.forRoot({
      timeOut: 350000,
      positionClass: "toast-top-right",
      preventDuplicates: true,
    }),
  ],
  

  providers: [ CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
