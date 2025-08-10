import { Routes } from '@angular/router';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';

  export enum DashboardPages {
    PROFILE = "profile",
    NOT_FOUND = "not-found",
  }
  
export const DASHBOARD_ROUTES: Routes = [
  { path: '', redirectTo: DashboardPages.PROFILE, pathMatch: 'full' },
  { path: DashboardPages.PROFILE, component: ProfilePageComponent, title: 'Profile' },
  { path: '**', component: NotFoundComponent, title: 'Page Not Found' }
];
