import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./core/guards/authentication.guard";
import { ShellLayoutComponent } from "./layouts/shell-layout/shell-layout.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        loadChildren: () => import("./../app/pages/login/login.module").then((m) => m.LoginModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
