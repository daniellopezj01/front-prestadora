import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoanRoutingModule } from './loan-routing.module';
import { BalanceComponent } from './pages/balance/balance.component';
import { RegisterComponent } from './pages/register/register.component';


@NgModule({
  declarations: [BalanceComponent, RegisterComponent],
  imports: [
    CommonModule,
    LoanRoutingModule
  ]
})
export class LoanModule { }
