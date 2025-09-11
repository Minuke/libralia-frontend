import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';
import { PasswordResetPageComponent } from './pages/password-reset-page/password-reset-page.component';
import { authGuard } from '@shared/guards/auth.guard';

export enum AuthPages {
  LOGIN = "login",
  REGISTER = "register",
  PASSWORD_RESET = "password-reset",
  NOT_FOUND = "not-found",
}

export const AUTH_ROUTES: Routes = [
  { path: '', redirectTo: AuthPages.LOGIN, pathMatch: 'full' },
  {
    path: AuthPages.LOGIN, component: LoginPageComponent, title: 'Login', canActivate: [authGuard('loggedOut')]
  },
  {
    path: AuthPages.REGISTER, component: RegisterPageComponent, title: 'Register', canActivate: [authGuard('loggedOut')]
  },
  {
    path: AuthPages.PASSWORD_RESET, component: PasswordResetPageComponent, title: 'Password Reset', canActivate: [authGuard('loggedIn')]
  },
  {
    path: "google/callback",
    loadComponent: () =>
      import("../../features/auth/components/google-callback/google-callback.component").then((c) => c.GoogleCallbackComponent)
  },
  { path: '**', component: NotFoundComponent, title: 'Page Not Found' }
];
