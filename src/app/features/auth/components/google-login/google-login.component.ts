import { Component } from '@angular/core';
import { environment } from 'environments/environment.development';

@Component({
  selector: 'app-google-login',
  imports: [],
  templateUrl: './google-login.component.html',
  styleUrl: './google-login.component.scss'
})
export class GoogleLoginComponent {
  public googleSignInUrl = "";
  public redirectUri: string = environment.googleCallbackUri;
  public clientId: string = environment.googleClientId;

  public ngOnInit(): void {
    this.googleSignInUrl =
      `https://accounts.google.com/o/oauth2/v2/auth` +
      `?redirect_uri=${encodeURIComponent(this.redirectUri)}` +
      `&prompt=consent&response_type=code` +
      `&client_id=${encodeURIComponent(this.clientId)}` +
      `&scope=openid%20email%20profile&access_type=offline`;
  }

  public onGoogleSignIn(): void {
    window.location.href = this.googleSignInUrl;
  }
}
