import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '@features/auth/services/login-service.service';
import { map, catchError, of } from 'rxjs';

/**
 * Defines the guard's behavior.
 * 'loggedIn': allows access only if the user is authenticated.
 * 'loggedOut': allows access only if the user is NOT authenticated.
 */
export type AuthGuardType = 'loggedIn' | 'loggedOut';

/**
 * Configurable guard to protect routes.
 * Evaluates whether the user is authenticated and allows or blocks navigation
 * based on the configured protection type.
 *
 * @param type The type of protection to apply ('loggedIn' or 'loggedOut').
 */
export const authGuard = (type: AuthGuardType): CanActivateFn => {
  return (route, state) => {
    const loginService = inject(LoginService);
    const router = inject(Router);

    // Attempting to retrieve the access token.
    const accessToken = loginService.getStoredAccessToken();
    const isAuthenticated = !!accessToken;

    if (type === 'loggedIn') {
      // Protection for routes restricted to authenticated users (e.g., Dashboard, Editor)
      if (isAuthenticated) {
        // The session is valid, access is allowed.
        return true;
      } else {
        // No active session, redirecting to the login page.
        router.navigate(['/auth/login']);
        return false;
      }
    }

    if (type === 'loggedOut') {
      // Protection for routes restricted to unauthenticated users (e.g., Login, Signup)
      if (isAuthenticated) {
        // An active session exists, access is blocked and the user is redirected to the dashboard.
        router.navigate(['/dashboard']);
        return false;
      } else {
        // No active session, access is allowed.
        return true;
      }
    }

    // By default, if the type is invalid, access is blocked.
    return false;
  };
};
