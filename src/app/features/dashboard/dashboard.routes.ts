import { Routes } from '@angular/router';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';
import { isAuthenticated } from '@shared/guards/is-authenticated.guard';
import { EditUserPageComponent } from './pages/edit-user-page/edit-user-page.component';
import { PasswordChangePageComponent } from './pages/password-change-page/password-change-page.component';

export enum DashboardPages {
  PROFILE = "profile",
  PROFILE_EDIT = "profile-edit",
  PASSWORD_CHANGE = "password-change",
  NOT_FOUND = "not-found",
}

export const DASHBOARD_ROUTES: Routes = [
  { path: '', redirectTo: DashboardPages.PROFILE, pathMatch: 'full' },
  {
    path: DashboardPages.PROFILE, component: ProfilePageComponent, title: 'Profile', canActivate: [isAuthenticated],
    data: { authMode: 'private' }
  },
  {
    path: DashboardPages.PROFILE_EDIT, component: EditUserPageComponent, title: 'Edit User', canActivate: [isAuthenticated],
    data: { authMode: 'private' }
  },
  {
    path: DashboardPages.PASSWORD_CHANGE, component: PasswordChangePageComponent, title: 'Password Change', canActivate: [isAuthenticated],
    data: { authMode: 'private' }
  },
  { path: '**', component: NotFoundComponent, title: 'Page Not Found' }
];
