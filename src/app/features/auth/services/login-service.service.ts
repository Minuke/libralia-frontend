import { inject, Injectable, signal, computed } from '@angular/core';
import { UsersService } from '@shared/services/users-service.service';
import { StorageService } from '@core/services/storage.service';
import { User } from '@shared/entities/interfaces/user.interface';
import { LoginEmailParams, LoginUsernameParams } from '../entities/interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private readonly usersService = inject(UsersService);
  private readonly storageService = inject(StorageService);

  private readonly currentUserSignal = signal<User | null>(null);

  public readonly currentUser = computed(() => this.currentUserSignal());
  public readonly isAuthenticated = computed(() => this.currentUserSignal() !== null);

  constructor() {
    const storedUser = this.storageService.getUser();
    if (storedUser) {
      this.currentUserSignal.set(storedUser);
    }
  }

  /** Iniciar sesión por email o username */
  public login(params: LoginEmailParams | LoginUsernameParams): boolean {
    let user: User | undefined;

    if ('email' in params) {
      user = this.usersService.findByEmail(params.email);
    } else {
      user = this.usersService.findByUsername(params.username);
    }

    if (user && user.password === params.password) {
      this.setCurrentUser(user);
      return true;
    }

    this.logout();
    return false;
  }

  /** Cerrar sesión */
  public logout(): void {
    this.currentUserSignal.set(null);
    this.storageService.clearUser();
  }

  /** Establecer usuario actual */
  public setCurrentUser(user: User): void {
    this.currentUserSignal.set(user);
    this.storageService.setUser(user);
  }
}