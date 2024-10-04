import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { ButtonModule } from "primeng/button";
import { InputTextareaModule } from 'primeng/inputtextarea';
import { LoginLayoutComponent } from "./login-layout/login-layout.component";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
];

const components = [LoginComponent];

@NgModule({
  declarations: [...components, LoginLayoutComponent],
  imports: [CommonModule, RouterModule.forChild(routes), TranslateModule, ReactiveFormsModule, FormsModule, ButtonModule, InputTextareaModule ],
  providers: [],
})
export class LoginModule {}
