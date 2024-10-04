import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, ViewChild } from "@angular/core";
import { ITableButtons, ITableColumnModel } from "./default-data-table.model";

@Component({
  selector: "app-default-data-table",
  templateUrl: "./default-data-table.component.html",
  styleUrls: ["./default-data-table.component.scss"],
})
export class DefaultDataTableComponent implements OnInit {
  @Input() bodyTemplate: TemplateRef<any>;
  @Input() selectedTableRow: any;
  @Input() title = "";
  @Input() dataKey = "Id";
  @Output() selectedTableRowChange = new EventEmitter<any>();
  @Input() dataSource: Array<any> = [];
  @Input() columns: Array<any> = [];
  @Input() buttons: Array<any> = [];

  hasRowButtons = false;

  selection: any;

  @ViewChild("dt", { static: false }) dt: any;

  constructor() {}

  filter($event: any) {
    if (!this.dt) return;
    this.dt.filterGlobal($event.target?.value, "contains");
  }

  ngOnInit() {
    if (this.buttons) {
      this.buttons.forEach((x) => {
        x.type = x.type ? x.type : "row";
      });

      this.hasRowButtons = this.getRowButtons().length > 0;
    }
  }

  getHeaderButtons() {
    return this.buttons.filter((x) => x.type === "header");
  }

  getRowButtons() {
    return this.buttons.filter((x) => x.type === "row");
  }

  rowSelected() {
    this.selectedTableRow = this.selection;
    this.selectedTableRowChange.emit(this.selectedTableRow);
  }

  rowUnselected() {
    this.selectedTableRow = this.selection;
    this.selectedTableRowChange.emit(this.selectedTableRow);
  }

  getDisabled(button: ITableButtons, key: any) {
    if (button.disabled) {
      return button.disabled(key);
    } else {
      return false;
    }
  }
}
