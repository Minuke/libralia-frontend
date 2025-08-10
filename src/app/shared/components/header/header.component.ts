import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '@features/auth/services/login-service.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  private readonly loginService = inject(LoginService);
  private readonly router = inject(Router);

  public readonly isAuthenticated = this.loginService.isAuthenticated;
  public readonly currentUser = this.loginService.currentUser;

    public logout(): void {
    this.loginService.logout();
    this.router.navigate(['/auth/login']);
  }

}
