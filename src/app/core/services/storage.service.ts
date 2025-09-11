import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  private readonly ACCESS_KEY = 'access';
  private readonly REFRESH_KEY = 'refresh';

  setAccessToken(token: string): void {
    sessionStorage.setItem(this.ACCESS_KEY, token);
  }
  getAccessToken(): string | null {
    return sessionStorage.getItem(this.ACCESS_KEY);
  }
  clearAccessToken(): void {
    sessionStorage.removeItem(this.ACCESS_KEY);
  }

  setRefreshToken(token: string): void {
    sessionStorage.setItem(this.REFRESH_KEY, token);
  }
  getRefreshToken(): string | null {
    return sessionStorage.getItem(this.REFRESH_KEY);
  }
  clearRefreshToken(): void {
    sessionStorage.removeItem(this.REFRESH_KEY);
  }

  clearAll(): void {
    sessionStorage.clear();
  }

}