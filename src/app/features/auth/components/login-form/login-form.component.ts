import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Login } from '@features/auth/entities/interfaces/login.interface';
import { LoginService } from '@features/auth/services/login-service.service';
import { InputErrorsComponent } from '@shared/components/input-errors/input-errors.component';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputErrorsComponent, RouterLink],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {

  private readonly fb = inject(FormBuilder);
  private readonly loginService = inject(LoginService);
  private readonly router = inject(Router);

  public readonly loading = signal(false);
  public readonly error = signal<string | null>(null);

  public loginForm!: FormGroup;
  public mostrarContrasenia = signal<boolean>(false);

  public ngOnInit(): void {
    this.loginForm = this.fb.group({
      usernameOrEmail: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.error.set('Formulario inválido');
      return;
    }

    this.error.set(null);
    this.loading.set(true);
    const { usernameOrEmail, password } = this.loginForm.value;
    let loginPayload: Login;
    if (this.isEmail(usernameOrEmail)) {
      loginPayload = { email: usernameOrEmail, password };
    } else {
      loginPayload = { username: usernameOrEmail, password };
    }

    this.loginService.login(loginPayload).subscribe({
      next: (success) => {
        this.loading.set(false);
        if (success) {
          this.router.navigate(['/dashboard/profile']);
        }
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set('Usuario o contraseña incorrectos');
        console.error('Login error:', err.message);
      },
    });
  }

  private isEmail(value: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }

  public togglePasswordVisibility(): void {
    this.mostrarContrasenia.update((visible) => !visible);
  }

}
