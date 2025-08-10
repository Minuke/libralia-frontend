import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginEmailParams, LoginUsernameParams } from '@features/auth/entities/interfaces/login.interface';
import { LoginService } from '@features/auth/services/login-service.service';
import { InputErrorsComponent } from '@shared/components/input-errors/input-errors.component';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputErrorsComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {

  private readonly fb = inject(FormBuilder);
  private readonly loginService = inject(LoginService);
  private readonly router = inject(Router);

  public loginForm!: FormGroup;
  public mostrarContrasenia = signal<boolean>(false);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      usernameOrEmail: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public login(): void {
    if (this.loginForm.valid) {
      const { usernameOrEmail, password } = this.loginForm.value;
      let login: LoginEmailParams | LoginUsernameParams;

      if (this.isEmail(usernameOrEmail)) {
        login = { email: usernameOrEmail, password };
        console.log("Login con email:", login);
      } else {
        login = { username: usernameOrEmail, password };
        console.log("Login con username:", login);
      }
      const valid = this.loginService.login(login);
      if (valid) {
        console.log('✅ Login correcto');
        this.router.navigate(['dashboard', 'profile']);
      } else {
        console.error('❌ Usuario o contraseña incorrectos');
      }
    } else {
      this.loginForm.markAllAsTouched();
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
