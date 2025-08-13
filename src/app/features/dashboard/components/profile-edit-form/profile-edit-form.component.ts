import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InputErrorsComponent } from '@shared/components/input-errors/input-errors.component';
import { User } from '@shared/entities/interfaces/user.interface';
import { UsersService } from '@shared/services/users-service.service';
import { LoginService } from '@features/auth/services/login-service.service';

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
  private readonly loginService = inject(LoginService);
  private readonly router = inject(Router);

  public user = input.required<User>();

  public profileEditForm!: FormGroup;
  public mostrarContrasenia = signal<boolean>(false);

  ngOnInit(): void {
    const current = this.user();
    this.profileEditForm = this.fb.group({
      username: [current.username, [Validators.required]],
      correo: [current.email, [Validators.required, Validators.email]],
    });
  }

  public profileEdit(): void {
    if (this.profileEditForm.valid) {
      const updatedUser: User = {
        ...this.user(),
        username: this.profileEditForm.value.username,
        email: this.profileEditForm.value.correo
      };
      this.usersService.updateUser(updatedUser);
      this.loginService.setCurrentUser(updatedUser);
      console.log('✅ Perfil actualizado:', updatedUser);
      this.router.navigate(['/dashboard/profile']);
    } else {
      this.profileEditForm.markAllAsTouched();
      console.error("Formulario inválido");
    }
  }
}
