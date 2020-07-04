import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BalanceComponent } from "./pages/balance/balance.component";
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {
    path: "",
    component: BalanceComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoanRoutingModule {}
