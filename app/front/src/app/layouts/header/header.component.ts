import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { AuthenticationService } from "../../core/services/authentication.service";
import { LanguageService } from "../../core/services/language.service";
import { LayoutsService } from "../layouts.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  languages: { name: string; code: string; position: string }[] | undefined;
  selectedLanguage: { name: string; code: string; position: string } | undefined;

  constructor(
    public layoutsService: LayoutsService,
    private authService: AuthenticationService,
    private router: Router,
    private translateService: TranslateService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.languages = [
      { name: "English", code: "en", position: "-167px" },
      { name: "Ελληνικά", code: "el", position: "-2446px" },
    ];
    this.selectedLanguage = this.languages.find((x) => x.code === this.translateService.currentLang);

    console.log(this.translateService.currentLang);

    this.translateService.onLangChange.subscribe(() => {});
    const mediaSmall = window.matchMedia("(max-width: 767px)");
    if (mediaSmall.matches) {
      document.documentElement.style.setProperty("--sidebar-width", 0 + "px");
      this.layoutsService.sidebarOpen.next(false);
    }
    mediaSmall.addEventListener("change", (e) => {
      if (e.matches) {
        document.documentElement.style.setProperty("--sidebar-width", 0 + "px");
        this.layoutsService.sidebarOpen.next(false);
      } else {
        document.documentElement.style.setProperty("--sidebar-width", 250 + "px");
        this.layoutsService.sidebarOpen.next(true);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }

  toggleSidebar() {
    if (!this.layoutsService.sidebarOpen.value) {
      document.documentElement.style.setProperty("--sidebar-width", 250 + "px");
    } else {
      document.documentElement.style.setProperty("--sidebar-width", 0 + "px");
    }
    this.layoutsService.sidebarOpen.next(!this.layoutsService.sidebarOpen.value);
  }

  getLanguageName(lang: string = "") {
    if (lang === "") {
      lang = this.translateService.currentLang;
    }

    let name = "English";
    switch (lang) {
      case "en":
        name = "English";
        break;
      case "el":
        name = "Ελληνικά";
        break;
    }

    return name;
  }

  getLanguageImage(lang: string = "") {
    if (lang === "") {
      lang = this.translateService.currentLang;
    }

    let position = "0";
    switch (lang) {
      case "en":
        position = "-167px";
        break;
      case "el":
        position = "-2446px";
        break;
    }

    return position;
  }

  changeLanguage(lang: any) {
    this.languageService.changeLanguage(lang?.value?.code);
  }
}
