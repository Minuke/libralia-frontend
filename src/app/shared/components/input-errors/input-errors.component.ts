import { Component, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
	selector: 'app-input-errors',
	imports: [],
	templateUrl: './input-errors.component.html',
	styleUrl: './input-errors.component.scss'
})
export class InputErrorsComponent {
	public control = input.required<AbstractControl | null>();

	public shouldShowError(): boolean {
		const ctrl = this.control();
		return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
	}

	public errorMessage(): string | null {
		const ctrl = this.control();
		if (!ctrl || !ctrl.errors) {
			return null;
		}
		if (ctrl.errors["required"]) {
			return "Este campo es obligatorio";
		}
		if (ctrl.errors["email"]) {
			return "Email inválido";
		}
		if (ctrl.errors["minlength"]) {
			return `Debe tener al menos ${ctrl.errors["minlength"].requiredLength} caracteres`;
		}
		if (ctrl.errors["pattern"]) {
			return "Formato inválido";
		}
		if (ctrl.errors["forbiddenWord"]) {
			return "Este nombre no está permitido";
		}
		if (ctrl.errors["passwordMismatch"]) {
			return "Las contraseñas no coinciden";
		}
		if (ctrl.errors["numericOnly"]) {
			return "La contraseña no puede ser solo números";
		}
		if (ctrl.errors["missingUppercase"]) {
			return "Debe contener al menos una letra mayúscula";
		}
		if (ctrl.errors["missingLowercase"]) {
			return "Debe contener al menos una letra minúscula";
		}
		if (ctrl.errors["missingDigit"]) {
			return "Debe contener al menos un número";
		}
		if (ctrl.errors["missingSpecial"]) {
			return "Debe contener al menos un carácter especial";
		}

		return null;
	}
}