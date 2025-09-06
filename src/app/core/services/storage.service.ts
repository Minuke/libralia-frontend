import { Injectable } from '@angular/core';
import { UserDetails } from '@shared/entities/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  private readonly USER_KEY = 'user';
  private readonly ACCESS_KEY = 'access';
  private readonly REFRESH_KEY = 'refresh';

  public setUser(user: UserDetails): void {
    sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  public getUser(): UserDetails | null {
    const raw = sessionStorage.getItem(this.USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as UserDetails;
    } catch {
      console.error('Error parsing stored user JSON');
      return null;
    }
  }

  public clearUser(): void {
    sessionStorage.removeItem(this.USER_KEY);
  }

  public setAccessToken(token: string): void {
    sessionStorage.setItem(this.ACCESS_KEY, token);
  }

  public getAccessToken(): string | null {
    return sessionStorage.getItem(this.ACCESS_KEY);
  }

  public clearAccessToken(): void {
    sessionStorage.removeItem(this.ACCESS_KEY);
  }

  public setRefreshToken(token: string): void {
    sessionStorage.setItem(this.REFRESH_KEY, token);
  }

  public getRefreshToken(): string | null {
    return sessionStorage.getItem(this.REFRESH_KEY);
  }

  public clearRefreshToken(): void {
    sessionStorage.removeItem(this.REFRESH_KEY);
  }

  public clearAll(): void {
    sessionStorage.clear();
  }

}