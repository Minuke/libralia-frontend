import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InputErrorsComponent } from '@shared/components/input-errors/input-errors.component';
import { PatchedUserDetails, UserDetails } from '@shared/entities/interfaces/user.interface';
import { UsersService } from '@shared/services/users-service.service';
import { take } from 'rxjs';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-profile-edit-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputErrorsComponent, RouterLink],
  templateUrl: './profile-edit-form.component.html',
  styleUrl: './profile-edit-form.component.scss'
})
export class ProfileEditFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly usersService = inject(UsersService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  public user = input.required<UserDetails>();

  public profileEditForm!: FormGroup;
  public mostrarContrasenia = signal<boolean>(false);
  public loading = signal(false);
  public error = signal<string | null>(null);
  public success = signal<string | null>(null);

  public ngOnInit(): void {
    const current = this.user();
    this.profileEditForm = this.fb.group({
      username: [current.username, [Validators.required]],
      correo: [current.email, [Validators.required, Validators.email]],
    });
  }

  public profileEdit(): void {
    if (this.profileEditForm.invalid) {
      this.profileEditForm.markAllAsTouched();
      this.error.set('Formulario inválido');
      return;
    }

    this.loading.set(true);
    this.error.set(null);
    this.success.set(null);

    const payload: PatchedUserDetails = {
      username: this.profileEditForm.value.username,
      email: this.profileEditForm.value.correo,
    };

    this.usersService
      .updateUser(payload)
      .pipe(take(1))
      .subscribe({
        next: (success) => {
          this.loading.set(false);
          this.authService.setUser(success);
          this.router.navigate(['/dashboard/profile']);
        },
        error: (err) => {
          this.loading.set(false);
          this.error.set('Error al cambiar el perfil');
          console.error('Profile edit error:', err.message);
        }
      });
  }
}
