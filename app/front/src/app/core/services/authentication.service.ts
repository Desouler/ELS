import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { DefaultResponseModel } from "../models/default-response.model";

export interface Credentials {
  email: string;
  password: string;
}

export interface Profile {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  dateOfBirth: Date;
  homePhone: number;
  mobilePhone: number;
  gender: string;
  address: string;
  city: string;
  country: string;
  postcode: string;
}

export interface RefreshTokenRequestModel {
  token: string;
}

export interface LoginSuccessModel {
  email: string;
  roles: string[];
  access_token: string;
  refresh_token: string;
  expires_in: string;
  token_type: string;
  userId: number;
  companyId?: number;
  profileId?: number;
}

export interface MultiCompanyLoginResponse {
  id: number;
  companyName: string;
}

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  public loginSuccess: EventEmitter<LoginSuccessModel> = new EventEmitter<LoginSuccessModel>();
  public logoutSuccess: EventEmitter<any> = new EventEmitter<any>();

  private loginsLey = "token_response";

  constructor(private http: HttpClient) {}

  public login(model: Credentials) {
    return this.http.post<DefaultResponseModel<LoginSuccessModel>>(`${environment.serverPath}/auth/token`, model);
  }

  public register(model: any) {
    return this.http.post(`${environment.serverPath}/auth/register`, model);
  }

  public getUserProfile(): Observable<DefaultResponseModel<Profile>> {
    return this.http.get(`${environment.serverPath}/auth/profile`) as Observable<any>;
  }

  checkEmailExists(email: string) {
    return this.http.post<{ existingUser: boolean }>(`${environment.serverPath}/auth/v2/check-mail`, { email });
  }

  public logout() {
    this.doLogoutUser();
    return of(true);
  }

  public refreshToken(): Observable<LoginSuccessModel> {
    const model: RefreshTokenRequestModel = {
      token: this.getRefreshToken() ? (this.getRefreshToken() as string) : "",
    };

    return this.http.post<LoginSuccessModel>(`${environment.serverPath}/auth/v2/refresh-token`, model);
  }

  public getTokenModel(): LoginSuccessModel | null {
    if (localStorage.getItem(this.loginsLey)) {
      try {
        return JSON.parse(String(localStorage.getItem(this.loginsLey))) as LoginSuccessModel;
      } catch (err) {
        return null;
      }
    }
    return null;
  }

  public getUserId() {
    if (this.isUserAuthenticated()) {
      return this.getTokenModel()?.userId;
    }

    return undefined;
  }

  public getJwtToken() {
    try {
      return this.getTokenModel()?.access_token;
    } catch (err) {}
    return "";
  }

  public isUserAuthenticated(): boolean {
    const tokenReponse = this.getTokenModel();

    if (!tokenReponse) return false;

    return true;
  }

  public hasRole(role: string) {
    try {
      if (this.getTokenModel()?.roles.includes(role)) {
        return true;
      }
    } catch (err) {}
    return false;
  }

  public hasAnyRole(roles: string[]) {
    try {
      if ((this.getTokenModel()?.roles as string[]).find((x) => roles.includes)) {
        return true;
      }
    } catch (err) {}
    return false;
  }

  private getRefreshToken() {
    try {
      return this.getTokenModel()?.refresh_token;
    } catch (err) {}
    return undefined;
  }

  storeLogins(tokenResponse: LoginSuccessModel) {
    localStorage.setItem(this.loginsLey, JSON.stringify(tokenResponse));
  }

  public doLoginUser(username: string, loginResponse: LoginSuccessModel) {
    this.storeLogins(loginResponse);
    this.loginSuccess.emit(loginResponse);
  }

  public doLogoutUser() {
    let activeToken;
    if (this.getJwtToken()) {
      activeToken = this.getJwtToken()?.toString();
    }

    this.removeTokens();

    localStorage.removeItem("language");
    localStorage.removeItem("_profile");
    localStorage.removeItem(this.loginsLey);

    if (activeToken) {
      this.logoutSuccess.emit(activeToken);
    }
  }

  private removeTokens() {
    localStorage.removeItem(this.loginsLey);
  }

  public forgotPassword(email: string, type: string, locale: string) {
    return this.http.post(`${environment.serverPath}/auth/v2/mobile-request-forgot-password`, { email, type, locale });
  }

  public resetPassword(email: string, otp: string, password: string) {
    return this.http.post(`${environment.serverPath}/auth/v2/mobile-forgot-password`, { email, otp, password });
  }
}
