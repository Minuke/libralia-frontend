import { Routes } from '@angular/router';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import("@features/auth/auth.routes").then((r) => r.AUTH_ROUTES) },
  { path: '**', component: NotFoundComponent }
];
