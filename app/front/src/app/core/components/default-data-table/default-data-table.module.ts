import { NgModule } from "@angular/core";
import { DefaultDataTableComponent } from "./default-data-table.component";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { TooltipModule } from "primeng/tooltip";
import { CheckboxModule } from "primeng/checkbox";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [DefaultDataTableComponent],
  imports: [CommonModule, TranslateModule, RouterModule, TableModule, ButtonModule, TooltipModule, FormsModule, CheckboxModule],
  exports: [DefaultDataTableComponent],
})
export class DefaultDataTableModule {}
