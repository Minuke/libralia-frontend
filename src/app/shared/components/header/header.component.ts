import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { LoginService } from '@features/auth/services/login-service.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private readonly authService = inject(AuthService);
  private readonly loginService = inject(LoginService);
  private readonly router = inject(Router);

  public readonly isAuthenticated = this.authService.isAuthenticated;
  public readonly currentUser = this.authService.user;

  public logout(): void {
    this.loginService.logout().subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      }
    });
  }

}
