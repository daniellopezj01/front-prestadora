import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingbuttonDirective } from './loadingbutton.directive';

@NgModule({
  declarations: [LoadingbuttonDirective],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingbuttonDirective,
  ],
})
export class SharedModule { }
