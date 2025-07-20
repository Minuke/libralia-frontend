import { Component, inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  public loginForm!: FormGroup;

  public ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    // Procesar datos del formulario
    const { username, password } = this.loginForm.value;
    console.log('Credenciales enviadas:', { username, password });

    // Podrías llamar a un servicio aquí
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
}
