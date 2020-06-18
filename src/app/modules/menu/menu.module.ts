import { MenuBottomComponent } from './menu-bottom/menu-bottom.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  declarations: [MenuBottomComponent],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [MenuBottomComponent]
})
export class MenuModule { }
