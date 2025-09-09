import { inject, Injectable, signal, computed } from '@angular/core';
import { StorageService } from '@core/services/storage.service';
import { tap, map, catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserDetails } from '@shared/entities/interfaces/user.interface';
import { environment } from 'environments/environment.development';
import { JWT, Login } from '../entities/interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private readonly http = inject(HttpClient);
  private readonly storageService = inject(StorageService);

  private readonly currentUserSignal = signal<UserDetails | null>(null);
  private readonly accessTokenSignal = signal<string | null>(null);
  private readonly refreshTokenSignal = signal<string | null>(null);

  public readonly currentUser = computed(() => this.currentUserSignal());
  public readonly isAuthenticated = computed(() => this.currentUserSignal() !== null);

  constructor() {
    const storedUser = this.storageService.getUser();
    const storedAccess = this.storageService.getAccessToken();
    const storedRefresh = this.storageService.getRefreshToken();


    if (storedUser && storedAccess) {
      this.currentUserSignal.set(storedUser);
      this.accessTokenSignal.set(storedAccess);
      this.refreshTokenSignal.set(storedRefresh);
    }
  }

  public login(params: Login) {
    return this.http.post<JWT>(`${environment.apiUrl}/auth/login/`, params).pipe(
      tap((response) => {
        this.setSession(response.user, response.access, response.refresh);
      }),
    )
  }

  public refreshToken() {
    const refresh = this.getRefreshToken();
    if (!refresh) return of(null);

    return this.http.post<{ access: string }>(`${environment.apiUrl}/auth/token/refresh/`, { refresh }).pipe(
      tap((response) => {
        if (response.access) {
          this.accessTokenSignal.set(response.access);
          this.storageService.setAccessToken(response.access);
        }
      }),
      map((response) => response.access ?? null),
      catchError((err) => {
        console.error('Refresh token failed', err);
        this.logout();
        return of(null);
      })
    );
  }

  public logout() {
    return this.http.post<{detail: string }>(`${environment.apiUrl}/auth/logout/`, {}).pipe(
      tap(() => {
        this.localLogout();
      }),
      catchError((err) => { 
        console.error('Logout error:', err.message);
        this.localLogout();
        return of(null);
      })
    );
  }

  public localLogout(): void {
    this.currentUserSignal.set(null);
    this.accessTokenSignal.set(null);
    this.refreshTokenSignal.set(null);
    this.storageService.clearUser();
    this.storageService.clearAccessToken();
    this.storageService.clearRefreshToken();
  }


  private setSession(user: UserDetails, access: string, refresh: string): void {
    this.currentUserSignal.set(user);
    this.accessTokenSignal.set(access);
    this.refreshTokenSignal.set(refresh);
    this.storageService.setUser(user);
    this.storageService.setAccessToken(access);
    this.storageService.setRefreshToken(refresh);
  }


  public getAccessToken(): string | null {
    return this.accessTokenSignal();
  }

  public getRefreshToken(): string | null {
    return this.refreshTokenSignal();
  }
}