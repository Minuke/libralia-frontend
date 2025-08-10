import { Component, inject } from '@angular/core';
import { LoginService } from '@features/auth/services/login-service.service';

@Component({
  selector: 'app-profile-page',
  imports: [],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {

  private readonly loginService = inject(LoginService);

  public readonly isAuthenticated = this.loginService.isAuthenticated;
  public readonly currentUser = this.loginService.currentUser;

}
