import { inject, Injectable } from '@angular/core';
import { StorageService } from '@core/services/storage.service';
import { tap, map, catchError, of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserDetails } from '@shared/entities/interfaces/user.interface';
import { environment } from 'environments/environment.development';
import { JWT, Login } from '../entities/interfaces/login.interface';
import { AuthService } from '@core/services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);
  private readonly storageService = inject(StorageService);

  constructor() {
    const storedAccess = this.storageService.getAccessToken();
    const storedRefresh = this.storageService.getRefreshToken();

    if (storedAccess) {
      this.authService.setAccessToken(storedAccess);
      this.authService.setRefreshToken(storedRefresh);
    }
  }

  public getStoredAccessToken(): string | null {
    return this.storageService.getAccessToken();
  }

  public login(params: Login) {
    return this.http.post<JWT>(`${environment.apiUrl}/auth/login/`, params).pipe(
      tap((response) => {
        this.setSession(response.user, response.access, response.refresh);
      }),
    )
  }

  public fetchCurrentUser(): Observable<UserDetails> {
    return this.http.get<UserDetails>(`${environment.apiUrl}/auth/user/`).pipe(
      tap(user => this.authService.setUser(user))
    );
  }

  public refreshToken() {
    const refresh = this.authService.getRefreshToken();
    if (!refresh) return of(null);

    return this.http.post<{ access: string }>(`${environment.apiUrl}/auth/token/refresh/`, { refresh }).pipe(
      tap((response) => {
        if (response.access) {
          this.authService.setAccessToken(response.access);
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
    return this.http.post<{ detail: string }>(`${environment.apiUrl}/auth/logout/`, {}).pipe(
      tap(() => this.localLogout()),
      catchError((err) => {
        console.error('Logout error:', err.message);
        this.localLogout();
        return of(null);
      })
    );
  }

  public postLoginGoogle(code: string): Observable<JWT> {
    const body = new HttpParams().set("code", code);
    const headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    return this.http
      .post<JWT>("http://localhost:8000/api/auth/google/", body.toString(), { headers })
      .pipe(tap((response) => console.log("Inicio de sesión exitoso", response)));
  }

  private setSession(user: UserDetails, access: string, refresh: string): void {
    this.authService.setUser(user);
    this.authService.setAccessToken(access);
    this.authService.setRefreshToken(refresh);
    this.storageService.setAccessToken(access);
    this.storageService.setRefreshToken(refresh);
  }

  public localLogout(): void {
    this.authService.clear();
    this.storageService.clearAccessToken();
    this.storageService.clearRefreshToken();
  }
}