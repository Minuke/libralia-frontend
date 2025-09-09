import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const matchingPasswordsValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
	const password1Control =
		group.get("password1") || group.get("new_password1");
	const password2Control =
		group.get("password2") || group.get("new_password2");

	if (!password1Control || !password2Control) return null;

	// If the passwords do not match, assign the error to each control
	if (password1Control.value !== password2Control.value) {
		password1Control.setErrors({ ...(password1Control.errors || {}), passwordMismatch: true });
		password2Control.setErrors({ ...(password2Control.errors || {}), passwordMismatch: true });
	} else {
		// If they match, remove the 'passwordMismatch' error without clearing other possible errors
		if (password1Control.errors) {
			const { passwordMismatch, ...rest } = password1Control.errors;
			password1Control.setErrors(Object.keys(rest).length ? rest : null);
		}
		if (password2Control.errors) {
			const { passwordMismatch, ...rest } = password2Control.errors;
			password2Control.setErrors(Object.keys(rest).length ? rest : null);
		}
	}
	return null;
};
