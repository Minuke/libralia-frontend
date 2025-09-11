import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { StorageService } from '@core/services/storage.service';
import { LoginService } from '@features/auth/services/login-service.service';

@Component({
  selector: 'app-google-callback',
  imports: [],
  templateUrl: './google-callback.component.html',
  styleUrl: './google-callback.component.scss'
})
export class GoogleCallbackComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly loginService = inject(LoginService);
  private readonly storageService = inject(StorageService);
  private readonly authService = inject(AuthService);

  public ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      const code = params["code"];
      if (code) {
        this.exchangeCodeForToken(code);
      } else {
        console.error('No se encontró el parámetro "code" en la URL.');
      }
    });
  }

  public exchangeCodeForToken(code: string): void {
    this.loginService
      .postLoginGoogle(code)
      .subscribe({
        next: (response) => {
          this.storageService.setAccessToken(response.access);
          this.authService.setUser(response.user);
          this.router.navigate(["./dashboard"]);
        },
        error: (err) => {
          console.error("Error al intercambiar el código:", err);
          this.storageService.clearAll();
        }
      });
  }
}
