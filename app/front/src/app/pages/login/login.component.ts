import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { HelpersService } from "src/app/core/services/helpers.service";
import { ToastService } from "src/app/core/services/toast.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-login",
  styleUrls: ["./login.component.scss"],
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  form!: UntypedFormGroup;
  error = "";
  isFormSubmitting = false;
  showUi = false;
  isPopupVisible = false;
  profileForm!: UntypedFormGroup;
  profiles: Array<any> = [];
  responses: Array<any> = [];
  loginSettings: any;
  result: string = "";

  constructor(
    private httpClient: HttpClient,
    private fb: UntypedFormBuilder,
    private helpers: HelpersService,
    private toastService: ToastService
  ) {
    
  }

  get formControls() {
    return this.form.controls;
  }

  createForm() {
    this.form = this.fb.group({
      // apiKey: ["SXZQeVVaSUJwNGl6Yk9SZVdyTW86SndPaWs1MGpTd2lOajM5aF91YkZCUQ==", Validators.required],
      apiKey: ["", Validators.required],
      url: ["https://elastic:9200", Validators.required],
      query: ["system.auth.sudo.command", Validators.required], 
    });
  }

  ngOnInit() {
    this.showUi = false;
    this.createForm();
  }

  submit() {
    let headers = new HttpHeaders();
    const formData = this.form.getRawValue();
    const url = formData.url;
    const apiKey = formData.apiKey;
    headers = headers.set('Authorization', `ApiKey ${apiKey}`);
    
    this.httpClient.post(`${environment.serverPath}/elastic/get`, {apiKey, url}).subscribe( (res: any) => {this.result = JSON.stringify(res.data, null, 2)});
  }
}
