import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BalanceComponent } from "./pages/balance/balance.component";

const routes: Routes = [
  {
    path: "",
    component: BalanceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoanRoutingModule {}
