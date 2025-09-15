import { Routes } from '@angular/router';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';
import { EditUserPageComponent } from './pages/edit-user-page/edit-user-page.component';
import { PasswordChangePageComponent } from './pages/password-change-page/password-change-page.component';
import { authGuard } from '@shared/guards/auth.guard';
import { EditBookPageComponent } from './pages/edit-book-page/edit-book-page.component';

export enum DashboardPages {
  PROFILE = "profile",
  PROFILE_EDIT = "profile-edit",
  BOOK_EDIT = "book-edit/:id",
  PASSWORD_CHANGE = "password-change",
  NOT_FOUND = "not-found",
}

export const DASHBOARD_ROUTES: Routes = [
  { path: '', redirectTo: DashboardPages.PROFILE, pathMatch: 'full' },
  {
    path: DashboardPages.PROFILE, component: ProfilePageComponent, title: 'Profile', canActivate: [authGuard('loggedIn')]
  },
  {
    path: DashboardPages.PROFILE_EDIT, component: EditUserPageComponent, title: 'Edit User', canActivate: [authGuard('loggedIn')]
  },
  {
    path: DashboardPages.BOOK_EDIT, component: EditBookPageComponent, title: 'Edit Book', canActivate: [authGuard('loggedIn')]
  },
  {
    path: DashboardPages.PASSWORD_CHANGE, component: PasswordChangePageComponent, title: 'Password Change', canActivate: [authGuard('loggedIn')]
  },
  { path: '**', component: NotFoundComponent, title: 'Page Not Found' }
];
