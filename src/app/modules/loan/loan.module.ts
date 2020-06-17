import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoanRoutingModule } from './loan-routing.module';
import { BalanceComponent } from './pages/balance/balance.component';


@NgModule({
  declarations: [BalanceComponent],
  imports: [
    CommonModule,
    LoanRoutingModule
  ]
})
export class LoanModule { }
