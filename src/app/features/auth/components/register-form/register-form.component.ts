import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { forbiddenWordsValidator } from '@features/auth/validators/forbidden-words.validator';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  private readonly fb = inject(FormBuilder);

  public registerForm!: FormGroup;
  public mostrarContrasenia = signal<boolean>(false);

  public ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ["", [Validators.required, forbiddenWordsValidator(["root", "superuser", "admin"])]],
      email: ["", [Validators.required, Validators.email]],
      password1: ["", [Validators.required, Validators.minLength(8)]],
      password2: ["", [Validators.required, Validators.minLength(8)]]
    });
  }

  public register(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      console.error("Form is invalid");
      return;
    } else {
      console.log("Se detectó un username", this.registerForm.value);
    }
  }

  public getErrorMessage(controlName: string): string | null {
    const control = this.registerForm.get(controlName);
    if (!control?.touched || control?.valid) return null;

    if (control.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if (control.hasError('minlength')) {
      const min = control.getError('minlength')?.requiredLength;
      return `Se requieren al menos ${min} caracteres`;
    }

    if (control.hasError('email')) {
      return 'El correo electrónico no es válido';
    }

    if (control.hasError('forbiddenWord')) {
      const word = control.getError('forbiddenWord')?.word;
      return `La palabra "${word}" no está permitida`;
    }

    return null;
  }

  public togglePasswordVisibility(): void {
    this.mostrarContrasenia.update((visible) => !visible);
  }
}
