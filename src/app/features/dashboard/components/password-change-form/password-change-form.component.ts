import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InputErrorsComponent } from '@shared/components/input-errors/input-errors.component';
import { PasswordChange } from '@shared/entities/interfaces/user.interface';
import { UsersService } from '@shared/services/users-service.service';
import { matchingPasswordsValidator } from '@shared/validators/matching-passwords.validator';
import { passwordComplexityValidator } from '@shared/validators/password-complexity.validator';
import { notNumericOnlyValidator } from '@shared/validators/not-numeric-only.validator';
import { take } from 'rxjs';

@Component({
  selector: 'app-password-change-form',
  imports: [InputErrorsComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './password-change-form.component.html',
  styleUrl: './password-change-form.component.scss'
})
export class PasswordChangeFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly usersService = inject(UsersService);
  private readonly router = inject(Router);

  public passwordChangeForm!: FormGroup;
  public mostrarContrasenia = signal(false);

  public loading = signal(false);
  public error = signal<string | null>(null);
  public success = signal<string | null>(null);

  public ngOnInit(): void {
    this.passwordChangeForm = this.fb.group(
      {
        new_password1: ['', [Validators.required, Validators.minLength(8), notNumericOnlyValidator, passwordComplexityValidator]],
        new_password2: ['', [Validators.required, Validators.minLength(8), notNumericOnlyValidator, passwordComplexityValidator]],
      },
      { validators: matchingPasswordsValidator }
    );
  }

  public passwordChange(): void {
    if (this.passwordChangeForm.invalid) {
      this.passwordChangeForm.markAllAsTouched();
      this.error.set('Formulario inválido');
      return;
    }

    this.loading.set(true);
    this.error.set(null);
    this.success.set(null);

    const payload: PasswordChange = {
      new_password1: this.passwordChangeForm.value.new_password1,
      new_password2: this.passwordChangeForm.value.new_password2,
    };

    this.usersService
      .changePassword(payload)
      .pipe(take(1))
      .subscribe({
        next: (success) => {
          this.loading.set(false);
          this.router.navigate(['/dashboard/profile']);
        },
        error: (err) => {
          this.loading.set(false);
          this.error.set('Error al cambiar la contraseña');
          console.error('Password change error:', err.message);
        }
      });
  }

  public togglePasswordVisibility(): void {
    this.mostrarContrasenia.update(visible => !visible);
  }
}
