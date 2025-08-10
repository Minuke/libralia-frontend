import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '@features/auth/services/login-service.service';

export const isAuthenticated: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  const isAuth = loginService.isAuthenticated();
  const mode = route.data?.['authMode'] as 'private' | 'public' ?? 'private';

  if (mode === 'private') {
    // Solo permite si está autenticado
    if (isAuth) return true;
    router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  if (mode === 'public') {
    // Solo permite si NO está autenticado
    if (!isAuth) return true;
    router.navigate(['/dashboard/profile']);
    return false;
  }

  return true;
};
