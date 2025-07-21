import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { LoginEmailParams, LoginUsernameParams } from '@features/auth/interfaces/login.interface';
import { InputErrorsComponent } from '@shared/components/input-errors/input-errors.component';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, InputErrorsComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

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
      console.error("Form is invalid");
      return;
    } else {
      const { usernameOrEmail, password } = this.loginForm.value;
      let login: LoginEmailParams | LoginUsernameParams;
      if (this.isEmail(usernameOrEmail)) {
        login = { email: usernameOrEmail, password };
        console.log("Se detectó un email", login);
      } else {
        login = { username: usernameOrEmail, password };
        console.log("Se detectó un username", login);
      }
    }
  }

  public getErrorMessage(controlName: string): string | null {
    const control = this.loginForm.get(controlName);
    if (!control?.touched || control?.valid) return null;

    if (control.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if (control.hasError('minlength')) {
      const min = control.getError('minlength')?.requiredLength;
      return `Se requieren al menos ${min} caracteres`;
    }

    return null;
  }

  private isEmail(value: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }

  public togglePasswordVisibility(): void {
    this.mostrarContrasenia.update((visible) => !visible);
  }
}
