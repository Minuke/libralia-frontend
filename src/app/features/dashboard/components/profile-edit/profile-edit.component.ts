import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginEmailParams, LoginUsernameParams } from '@features/auth/entities/interfaces/login.interface';
import { LoginService } from '@features/auth/services/login-service.service';
import { ProfileEditParams, User } from '@shared/entities/interfaces/user.interface';
import { UsersService } from '../../../../shared/services/users-service.service';
import { InputErrorsComponent } from '@shared/components/input-errors/input-errors.component';

@Component({
  selector: 'app-profile-edit',
  imports: [ReactiveFormsModule, InputErrorsComponent, RouterLink],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.scss'
})
export class ProfileEditComponent {
  private readonly fb = inject(FormBuilder);
  private readonly loginService = inject(LoginService);
  private readonly usersService = inject(UsersService);
  private readonly router = inject(Router);

  public profileEditForm!: FormGroup;
  public mostrarContrasenia = signal<boolean>(false);
  public currentUser = this.loginService.currentUser;

  ngOnInit(): void {
    this.profileEditForm = this.fb.group({
      username: [this.currentUser()!.username, [Validators.required]],
      correo: [this.currentUser()!.email, [Validators.required, Validators.email]],
    });
  }

  public profileEdit(): void {
    if (this.profileEditForm.valid) {
      const updatedUser: User = {
      ...this.currentUser()!,
      username: this.profileEditForm.value.username,
      email: this.profileEditForm.value.correo
      
    };
    // 1️⃣ Actualizamos en UsersService (mock en memoria)
    this.usersService.updateUser(updatedUser);

    // 2️⃣ Actualizamos en LoginService y StorageService
    this.loginService.setCurrentUser(updatedUser);

    console.log('✅ Perfil actualizado:', updatedUser);

    // 3️⃣ Navegamos a la vista de perfil
    this.router.navigate(['dashboard', 'profile']);
     
    } else {
      this.profileEditForm.markAllAsTouched();
      console.error("Formulario inválido");
    }
  }

  private isEmail(value: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }

  public togglePasswordVisibility(): void {
    this.mostrarContrasenia.update((visible) => !visible);
  }

}
