import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minDescriptionLengthValidator(minLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value?.trim() || '';
    if (value.length < minLength) {
      return { minDescriptionLength: { requiredLength: minLength, actualLength: value.length } };
    }
    return null;
  };
}
