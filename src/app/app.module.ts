import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ToastrModule } from "ngx-toastr";
import { CookieService } from "ngx-cookie-service";
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
