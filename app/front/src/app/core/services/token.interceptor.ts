import { Inject, Injectable, InjectionToken, Injector } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from "@angular/common/http";
import { throwError, BehaviorSubject, of } from "rxjs";
import { AuthenticationService } from "../services/authentication.service";
import { catchError, switchMap, filter, take, timeout } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { ToastService } from "./toast.service";

export const DEFAULT_TIMEOUT = new InjectionToken<number>("defaultTimeout");

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    @Inject(DEFAULT_TIMEOUT) protected defaultTimeout: number,
    public authService: AuthenticationService,
    private router: Router,
    private readonly injector: Injector
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): any {
    const timeoutValue = request.headers.get("timeout") || this.defaultTimeout;
    const timeoutValueNumeric = Number(timeoutValue);

    if (this.authService.getJwtToken()) {
      request = this.addToken(request, this.authService.getJwtToken() as string);
    }

    return next.handle(request).pipe(
      timeout(timeoutValueNumeric),
      catchError((error) => {
        if (request.url.indexOf("auth/token") > -1) {
          return throwError(error);
        }
        if (error instanceof HttpErrorResponse && error.status === 401) {
          if (request.url.indexOf("refresh-token") > -1) {
            this.authService.logout();
            this.router.navigate(["/login"]);
            return of(null);
          }
          return this.handle401Error(request, next);
        } else {
          const toastService = this.injector.get(ToastService);
          if (environment.production) {
            toastService.errorMessage("alerts.GENERAL_ERROR");
          } else {
            toastService.errorMessage(error?.error?.message);
          }
          return throwError(error);
        }
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        "X-Site-Lang": "en",
      },
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.authService.refreshToken().pipe(
        switchMap((token) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.refresh_token);
          return next.handle(this.addToken(request, token.access_token));
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((jwt) => {
          return next.handle(this.addToken(request, jwt));
        })
      );
    }
  }
}
