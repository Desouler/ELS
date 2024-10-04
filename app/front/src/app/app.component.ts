import { Component, OnInit } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { SocketEvents } from "./core/enums/socket-events.enum";
import { AuthenticationService } from "./core/services/authentication.service";
import { LanguageService } from "./core/services/language.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "My App";

  constructor() {}

  ngOnInit() { 
  }
}
