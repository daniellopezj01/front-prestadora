import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./modules/home/home.module").then((m) => m.HomeModule),
    canActivateChild: [AuthGuard],
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./modules/auth/auth.module").then((m) => m.AuthModule),

  },
  {
    path: "users",
    loadChildren: () =>
      import("./modules/user/user.module").then((m) => m.UserModule),
      canActivateChild: [AuthGuard],
  },
  {
    path: "",
    redirectTo: "",
    pathMatch: "full",
    canActivateChild: [AuthGuard],
  },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      enableTracing: false,
      scrollPositionRestoration: "enabled",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
