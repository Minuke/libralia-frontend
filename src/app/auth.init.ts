import { inject, runInInjectionContext } from '@angular/core';
import { StorageService } from '@core/services/storage.service';
import { LoginService } from '@features/auth/services/login-service.service';

export function initAuth(appInjector: any): Promise<void> {
  return runInInjectionContext(appInjector, () => {
    const loginService = inject(LoginService);
    const storage = inject(StorageService);

    return new Promise<void>((resolve) => {
      const storedAccess = storage.getAccessToken();
      const storedRefresh = storage.getRefreshToken();

      if (!storedAccess || !storedRefresh) {
        resolve();
        return;
      }

      // Set tokens en AuthService
      loginService.restoreSession(storedAccess, storedRefresh);

      // Y pido el usuario actual
      loginService.fetchCurrentUser().subscribe({
        next: () => resolve(),
        error: () => {
          loginService.localLogout(); // si falla, limpiar todo
          resolve();
        }
      });
    });
  });
}
