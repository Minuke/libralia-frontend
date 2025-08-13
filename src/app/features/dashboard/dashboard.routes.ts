import { Routes } from '@angular/router';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';
import { isAuthenticated } from '@shared/guards/is-authenticated.guard';
import { ProfileEditPageComponent } from './pages/profile-edit-page/profile-edit-page.component';

export enum DashboardPages {
  PROFILE = "profile",
  PROFILE_EDIT = "profile-edit",
  NOT_FOUND = "not-found",
}

export const DASHBOARD_ROUTES: Routes = [
  { path: '', redirectTo: DashboardPages.PROFILE, pathMatch: 'full' },
  {
    path: DashboardPages.PROFILE, component: ProfilePageComponent, title: 'Profile', canActivate: [isAuthenticated],
    data: { authMode: 'private' }
  },
  {
    path: DashboardPages.PROFILE_EDIT, component: ProfileEditPageComponent, title: 'Profile Edit', canActivate: [isAuthenticated],
    data: { authMode: 'private' }
  },
  { path: '**', component: NotFoundComponent, title: 'Page Not Found' }
];
