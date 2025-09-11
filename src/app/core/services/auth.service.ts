import { computed, Injectable, signal } from '@angular/core';
import { UserDetails } from '@shared/entities/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly userSignal = signal<UserDetails | null>(null);
  private readonly accessTokenSignal = signal<string | null>(null);
  private readonly refreshTokenSignal = signal<string | null>(null);

  readonly user = computed(() => this.userSignal());
  readonly isAuthenticated = computed(() => this.userSignal() !== null);

  public setUser(user: UserDetails | null): void {
    this.userSignal.set(user);
  }

  public setAccessToken(token: string | null): void {
    this.accessTokenSignal.set(token);
  }

  public setRefreshToken(token: string | null): void {
    this.refreshTokenSignal.set(token);
  }

  public clear(): void {
    this.userSignal.set(null);
    this.accessTokenSignal.set(null);
    this.refreshTokenSignal.set(null);
  }

  public getUser(): UserDetails | null {
    return this.userSignal();
  }

  public getAccessToken(): string | null {
    return this.accessTokenSignal();
  }

  public getRefreshToken(): string | null {
    return this.refreshTokenSignal();
  }
}
