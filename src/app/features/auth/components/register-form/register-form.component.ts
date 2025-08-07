import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterParams } from '@features/auth/entities/interfaces/register.interface';
import { forbiddenWordsValidator } from '@features/auth/validators/forbidden-words.validator';
import { matchingPasswordsValidator } from '@features/auth/validators/matching-passwords.validator';
import { InputErrorsComponent } from '@shared/components/input-errors/input-errors.component';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule, InputErrorsComponent],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {

  private readonly fb = inject(FormBuilder);

  public registerForm!: FormGroup;
  public mostrarContrasenia = signal<boolean>(false);

  public ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        username: ["", [Validators.required, forbiddenWordsValidator(["root", "superuser", "admin"])]],
        email: ["", [Validators.required, Validators.email]],
        password1: ["", [Validators.required, Validators.minLength(8)]],
        password2: ["", [Validators.required, Validators.minLength(8)]]
      },
      { validators: matchingPasswordsValidator }
    );
  }

  public register(): void {
    if (this.registerForm.valid) {
      const register: RegisterParams = this.registerForm.value;
      console.log("Form submitted successfully", register);
    } else {
      this.registerForm.markAllAsTouched();
      console.error("Form is invalid");
    }
  }

  public togglePasswordVisibility(): void {
    this.mostrarContrasenia.update((visible) => !visible);
  }
}