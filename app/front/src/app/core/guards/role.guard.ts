import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Roles } from "../enums/roles.enum";
import { AuthenticationService } from "../services/authentication.service";

@Injectable({
  providedIn: "root",
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const roles = next.data.roles ? (next.data.roles as string[]) : [];
    if (roles.length > 0) {
      for (let i = 0; i < roles.length; i++) {
        if (this.authService.hasRole(roles[i])) {
          if (this.authService.hasRole(Roles.RoleSuperAdmin)) {
          }
          return true;
        }
      }
    }
    this.authService.doLogoutUser();
    this.router.navigate(["/login"]);
    return false;
  }
}
