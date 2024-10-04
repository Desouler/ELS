import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { ShellLayoutComponent } from "./shell-layout/shell-layout.component";
import { RouterModule } from "@angular/router";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { HeaderComponent } from "./header/header.component";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule } from "@angular/forms";
import { ToastService } from "../core/services/toast.service";

@NgModule({
  declarations: [ShellLayoutComponent, SidebarComponent, HeaderComponent],
  imports: [CommonModule, RouterModule, TranslateModule.forChild(), DropdownModule, FormsModule],
  providers: [ToastService],
})
export class LayoutsModule {}
