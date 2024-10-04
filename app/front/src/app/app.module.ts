import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { LoadingBarHttpClientModule } from "@ngx-loading-bar/http-client";
import { LayoutsModule } from "./layouts/layouts.module";
import { ToastModule } from "primeng/toast";
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { environment } from "src/environments/environment";
import { DEFAULT_TIMEOUT, TokenInterceptor } from "./core/services/token.interceptor";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ConfirmationService, MessageService } from "primeng/api";
import { ConfirmDialogModule } from "primeng/confirmdialog";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const config: SocketIoConfig = { url: environment.socketPath, options: {} };

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutsModule,
    HttpClientModule,
    LoadingBarHttpClientModule,
    ToastModule,
    ConfirmDialogModule,
    SocketIoModule.forRoot(config),
    TranslateModule.forRoot({
      defaultLanguage: "en",
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    BrowserAnimationsModule,
  ],
  providers: [
    [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
    [{ provide: DEFAULT_TIMEOUT, useValue: 30000 }],
    ConfirmationService,
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
