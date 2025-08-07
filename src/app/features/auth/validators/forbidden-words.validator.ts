import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function forbiddenWordsValidator(forbiddenWords: string[]): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const forbidden = forbiddenWords.some((name) => control.value?.toLowerCase().includes(name.toLowerCase()));
		return forbidden ? { forbiddenWord: { value: control.value } } : null;
	};
}
