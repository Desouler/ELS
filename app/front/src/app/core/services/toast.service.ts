import { Injectable } from "@angular/core";
import { MessageService, ConfirmationService } from "primeng/api";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root",
})
export class ToastService {
  constructor(
    private confirmationService: ConfirmationService,
    private translationService: TranslateService,
    private messageService: MessageService
  ) {}

  public successMessage(message: string) {
    message = this.translationService.instant(message);
    this.messageService.add({
      severity: "success",
      summary: this.translationService.instant("alerts.successTitle"),
      detail: message,
    });
  }

  public errorMessage(message: string) {
    message = this.translationService.instant(message);
    this.messageService.add({
      severity: "error",
      summary: this.translationService.instant("alerts.errorTitle"),
      detail: message,
    });
  }

  public generalErrorMessage() {
    this.messageService.add({
      severity: "error",
      summary: this.translationService.instant("alerts.errorTitle"),
      detail: this.translationService.instant(`alerts.GENERAL_ERROR`),
    });
  }

  public warningMessage(message: string) {
    this.messageService.add({
      severity: "warn",
      summary: this.translationService.instant("alerts.warningTitle"),
      detail: message,
    });
  }

  public infoMessage(message: string) {
    this.messageService.add({
      severity: "info",
      summary: this.translationService.instant("alerts.infoTitle"),
      detail: message,
    });
  }

  public showNoEntrySelectedToast() {
    this.messageService.add({
      severity: "error",
      summary: this.translationService.instant("alerts.errorTitle"),
      detail: this.translationService.instant("alerts.NO_ENTRY_SELECTED"),
    });
  }

  public confirmDelete(callback: () => void) {
    return this.confirmationService.confirm({
      message: this.translationService.instant("alerts.confirmDeleteMessage"),
      acceptLabel: this.translationService.instant("button.texts.Yes"),
      rejectLabel: this.translationService.instant("button.texts.No"),
      accept: callback,
    });
  }

  public confirmDeleteWithMessage(message: any, callback: () => void) {
    return this.confirmationService.confirm({
      message,
      acceptLabel: this.translationService.instant("button.texts.Yes"),
      rejectLabel: this.translationService.instant("button.texts.No"),
      accept: callback,
    });
  }
}
