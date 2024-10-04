import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../core/services/authentication.service";
import { LayoutsService, menuItem, menuItems } from "../layouts.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  menu: Array<menuItem> = menuItems.filter((x) => x.sidebarMenuItem);

  constructor(public layoutsService: LayoutsService, private authService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {}

  closeSidebar() {
    document.documentElement.style.setProperty("--sidebar-width", 0 + "px");
    this.layoutsService.sidebarOpen.next(!this.layoutsService.sidebarOpen.value);
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }
}
