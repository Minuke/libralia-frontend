import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JWT } from '@features/auth/entities/interfaces/login.interface';
import { RegisterService } from '@features/auth/services/register.service';
import { forbiddenWordsValidator } from '@features/auth/validators/forbidden-words.validator';
import { matchingPasswordsValidator } from '@shared/validators/matching-passwords.validator';
import { InputErrorsComponent } from '@shared/components/input-errors/input-errors.component';
import { notNumericOnlyValidator } from '@shared/validators/not-numeric-only.validator';
import { passwordComplexityValidator } from '@shared/validators/password-complexity.validator';
@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputErrorsComponent],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {

  private readonly fb = inject(FormBuilder);
  private readonly registerService = inject(RegisterService);
  private readonly router = inject(Router);

  public registerForm!: FormGroup;
  public mostrarContrasenia = signal<boolean>(false);
  public loading = signal<boolean>(false);
  public error = signal<string | null>(null);

  public ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        username: ["", [Validators.required, forbiddenWordsValidator(["root", "superuser", "admin"])]],
        email: ["", [Validators.required, Validators.email]],
        password1: ["", [Validators.required, Validators.minLength(8), notNumericOnlyValidator, passwordComplexityValidator]],
        password2: ["", [Validators.required, Validators.minLength(8), notNumericOnlyValidator, passwordComplexityValidator]]
      },
      { validators: matchingPasswordsValidator }
    );
  }

  public register(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const registerPayload: JWT = this.registerForm.value;

    this.registerService.register(registerPayload).subscribe({
      next: (success) => {
        this.loading.set(false);
        if (success) {
          this.router.navigate(['/dashboard/profile']);
        }
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set('Error inesperado. Inténtalo de nuevo');
        console.error('Register error:', err.message);
      }
    });
  }

  public togglePasswordVisibility(): void {
    this.mostrarContrasenia.update(visible => !visible);
  }
}