import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { PrimeNGConfig } from "primeng/api";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class LanguageService {
  private readonly storageKey = "_lang";
  constructor(private translateService: TranslateService, private config: PrimeNGConfig) {}

  changeLanguage(lang = "") {
    if (!lang) {
      lang = environment.defaultLang;
    }
    this.translateService.use(lang);
    localStorage.setItem(this.storageKey, lang);
  }

  setDefaultLanguage() {
    let defaultLang = environment.defaultLang || "en";
    if (localStorage.getItem(this.storageKey)) {
      defaultLang = localStorage.getItem(this.storageKey)!;
    }

    this.translateService.setDefaultLang(defaultLang);
    this.translateService.use(defaultLang);

    this.translateService.get("calendarLocale").subscribe((res) => this.config.setTranslation(res));
  }
}
