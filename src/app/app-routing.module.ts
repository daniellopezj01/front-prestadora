import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";


const routes: Routes = [
  {
    path: "home",
    loadChildren: () => import("./modules/home/home.module").then(m => m.HomeModule),
  
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./modules/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "users",
    loadChildren: () =>
      import("./modules/user/user.module").then(m => m.UserModule),
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  { path: "**", redirectTo: "home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      preloadingStrategy: PreloadAllModules,
      enableTracing: false,
      scrollPositionRestoration: 'enabled',
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
