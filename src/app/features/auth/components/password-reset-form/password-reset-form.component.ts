import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '@features/auth/services/login-service.service';
import { InputErrorsComponent } from '@shared/components/input-errors/input-errors.component';
import { PasswordReset, UserDetails } from '@shared/entities/interfaces/user.interface';
import { UsersService } from '@shared/services/users-service.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-password-reset-form',
  imports: [InputErrorsComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './password-reset-form.component.html',
  styleUrl: './password-reset-form.component.scss'
})
export class PasswordResetFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly usersService = inject(UsersService);
  private readonly router = inject(Router);

  public passwordResetForm!: FormGroup;
  public loading = signal(false);
  public error = signal<string | null>(null);
  public success = signal<string | null>(null);

  ngOnInit(): void {
    this.passwordResetForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
    });
  }

  public passwordReset(): void {
    if (this.passwordResetForm.invalid) {
      this.passwordResetForm.markAllAsTouched();
      this.error.set('Formulario inválido');
      return;
    }

    this.loading.set(true);
    this.error.set(null);
    this.success.set(null);

    const payload: PasswordReset = {
      email: this.passwordResetForm.value.correo,
    };

    this.usersService
      .passwordReset(payload)
      .pipe(take(1))
      .subscribe({
        next: (success) => {
          this.loading.set(false);
          this.router.navigate(['/dashboard/profile']);
        },
        error: (err) => {
          this.loading.set(false);
          this.error.set('Error al resetear la contraseña');
          console.error('Password change error:', err.message);
        }
      });
  }
}
