import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { LoginService } from '@features/auth/services/login-service.service';
import { BehaviorSubject, throwError } from 'rxjs';
import {
  catchError,
  switchMap,
  finalize,
  filter,
  take,
} from 'rxjs/operators';

// Shared state across all requests
let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const loginService = inject(LoginService);
  const accessToken = loginService.getAccessToken();

  // Do not attach token to login/refresh endpoints
  const isAuthRequest =
    req.url.includes('/auth/login') || req.url.includes('/auth/refresh');

  if (accessToken && !isAuthRequest) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${accessToken}` },
    });
  }

  return next(req).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        // If no refresh is in progress, trigger it
        if (!isRefreshing) {
          isRefreshing = true;
          refreshTokenSubject.next(null); // Reset while refreshing
          return loginService.refreshToken().pipe(
            switchMap((newAccess) => {
              isRefreshing = false;
              if (newAccess) {
                // Notify waiting requests and retry the original one
                refreshTokenSubject.next(newAccess);
                const retryReq = req.clone({
                  setHeaders: { Authorization: `Bearer ${newAccess}` },
                });
                return next(retryReq);
              }
              // If no access token is returned → invalid session
              loginService.logout();
              return throwError(() => error);
            }),
            catchError((err) => {
              // If refresh throws an error → logout
              isRefreshing = false;
              loginService.logout();
              return throwError(() => err);
            }),
            finalize(() => {
              isRefreshing = false;
            })
          );
        } else {
          // A refresh is already in progress → wait until it emits a token
          return refreshTokenSubject.pipe(
            filter((token) => token !== null),
            take(1),
            switchMap((token) => {
              const retryReq = req.clone({
                setHeaders: { Authorization: `Bearer ${token as string}` },
              });
              return next(retryReq);
            })
          );
        }
      }

      // Other errors are propagated
      return throwError(() => error);
    })
  );
};
