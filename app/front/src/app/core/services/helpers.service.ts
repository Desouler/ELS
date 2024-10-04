import { Injectable } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";

@Injectable({ providedIn: "root" })
export class HelpersService {
  markFormGroupDirty(formGroup: UntypedFormGroup) {
    (Object as any).values(formGroup.controls).forEach((control: UntypedFormGroup) => {
      control.markAsDirty();

      if (control.controls) {
        this.markFormGroupDirty(control);
      }
    });
  }

  markFormGroupPristine(formGroup: UntypedFormGroup) {
    (Object as any).values(formGroup.controls).forEach((control: UntypedFormGroup) => {
      control.markAsPristine();

      if (control.controls) {
        this.markFormGroupPristine(control);
      }
    });
  }

  markFormGroupTouched(formGroup: UntypedFormGroup) {
    (Object as any).values(formGroup.controls).forEach((control: UntypedFormGroup) => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
