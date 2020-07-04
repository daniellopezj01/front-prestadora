import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { LoanRoutingModule } from './loan-routing.module';
import { BalanceComponent } from './pages/balance/balance.component';
import { RegisterComponent } from './pages/register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [BalanceComponent, RegisterComponent],
  imports: [
    CommonModule,
    LoanRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [DatePipe],
})
export class LoanModule { }
