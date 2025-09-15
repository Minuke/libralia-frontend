import { inject, runInInjectionContext } from '@angular/core';
import { StorageService } from '@core/services/storage.service';
import { LoginService } from '@features/auth/services/login-service.service';
import { DataService } from '@core/services/data.service';

export function initAuth(appInjector: any): Promise<void> {
  return runInInjectionContext(appInjector, () => {
    const loginService = inject(LoginService);
    const storage = inject(StorageService);
    const dataService = inject(DataService);

    return new Promise<void>((resolve) => {
      const storedAccess = storage.getAccessToken();
      const storedRefresh = storage.getRefreshToken();

      if (!storedAccess || !storedRefresh) {
        resolve();
        return;
      }

      loginService.restoreSession(storedAccess, storedRefresh);

      loginService.fetchCurrentUser().subscribe({
        next: (user) => {
          console.log('✅ Sesión restaurada para', user.username);
          dataService.loadInitialData();
          resolve();
        },
        error: () => {
          loginService.localLogout();
          resolve();
        }
      });
    });
  });
}
