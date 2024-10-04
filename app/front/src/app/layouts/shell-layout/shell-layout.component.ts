import { Component, OnInit } from "@angular/core";
import { LayoutsService } from "../layouts.service";

@Component({
  selector: "app-shell-layout",
  templateUrl: "./shell-layout.component.html",
  styleUrls: ["./shell-layout.component.scss"],
})
export class ShellLayoutComponent implements OnInit {
  constructor(public layoutsService: LayoutsService) {}

  ngOnInit(): void {}
}
