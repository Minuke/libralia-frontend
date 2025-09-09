import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

// Validates that the password is not only numbers
export const notNumericOnlyValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const value = control.value;
  if (value && /^\d+$/.test(value)) {
    return { numericOnly: true };
  }
  return null;
};