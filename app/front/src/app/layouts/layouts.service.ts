import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Roles } from "../core/enums/roles.enum";

@Injectable({
  providedIn: "root",
})
export class LayoutsService {
  sidebarOpen = new BehaviorSubject<boolean>(true);
  constructor() {}
}

export interface menuItem {
  routerLink?: string;
  iconClass?: any;
  text: string;
  sidebarMenuItem: boolean;
  tooltip?: string;
  roles?: Array<Roles>;
  subMenuItems?: Array<menuItem>;
}

export const menuItems: Array<menuItem> = [
  {
    routerLink: "/profile",
    iconClass: "fas fa-users fa-fw",
    text: "profile",
    sidebarMenuItem: true,
    tooltip: "profile",
  },
  {
    routerLink: "/my-data",
    iconClass: "fas fa-database fa-fw",
    text: "my-data",
    sidebarMenuItem: true,
    tooltip: "my-data",
  },
  {
    routerLink: "/consents",
    iconClass: "fas fa-handshake fa-fw",
    text: "consents",
    sidebarMenuItem: true,
    tooltip: "consents",
    // subMenuItems: [
    //   {
    //     routerLink: '/patients',
    //     roles: [Role.Doctor],
    //     iconClass: null,
    //     text: 'sidebar.Patients',
    //     sidebarMenuItem: true,
    //     tooltip: 'sidebar.Patients',
    //   }
    // ],
  },
];
