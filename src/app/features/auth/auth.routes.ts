import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';

export enum AuthPages {
	LOGIN = "login",
	REGISTER = "register",
  NOT_FOUND = "not-found",
}

export const AUTH_ROUTES: Routes = [
  { path: '', redirectTo: AuthPages.LOGIN, pathMatch: 'full' },
  { path: AuthPages.LOGIN, component: LoginPageComponent, title: 'Login' },
  { path: AuthPages.REGISTER, component: RegisterPageComponent, title: 'Register' },
  { path: '**', component: NotFoundComponent, title: 'Page Not Found' }
];
